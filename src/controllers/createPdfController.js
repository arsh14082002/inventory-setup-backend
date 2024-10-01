import puppeteer from 'puppeteer';
import { pdfTemplate } from '../documents/index.js';
import { transporter } from '../utils/mailTransporter.js';
import receiptModel from '../models/reciept.js';
import { generateReceiptId } from '../utils/generateRecieptId.js';

let browserInstance = null;

const getBrowserInstance = async () => {
  if (browserInstance) return browserInstance;
  browserInstance = await puppeteer.launch();
  return browserInstance;
};

export const pdfTemplateController = async (req, res) => {
  const {
    products,
    name,
    email,
    phone,
    discount = 0,
    paymentStatus,
    amountPaid,
    paymentMode,
  } = req.body;

  try {
    const receiptId = await generateReceiptId();

    let totalAmountBeforeTax = 0;
    let productDetails = [];

    products.forEach((product) => {
      const price = parseFloat(product.price) || 0;
      const quantity = parseFloat(product.quantity) || 1;
      const taxPercent = parseFloat(product.taxPercent) || 0;
      const taxAmount = (price * taxPercent) / 100;
      const productTotalAmount = (price + taxAmount) * quantity;

      totalAmountBeforeTax += price * quantity;

      productDetails.push({
        ...product,
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        productTotalAmount: parseFloat(productTotalAmount.toFixed(2)),
      });
    });

    const finalAmountBeforeDiscount =
      totalAmountBeforeTax + productDetails.reduce((acc, p) => acc + p.taxAmount, 0);
    const finalAmount = finalAmountBeforeDiscount - discount;

    const content = pdfTemplate({
      products: productDetails,
      name,
      email,
      phone,
      receiptId,
      discount,
      paymentStatus,
      amountPaid,
      paymentMode,
      totalAmount: finalAmount,
    });

    const receiptBill = new receiptModel({
      products: productDetails,
      name,
      email,
      phone,
      receiptId,
      discount,
      paymentStatus,
      amountPaid,
      paymentMode,
      totalAmount: finalAmount,
      dues: finalAmount - (amountPaid || 0),
    });

    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    await page.setContent(content);

    const [pdfBuffer, savedReceipt] = await Promise.all([
      page.pdf({ format: 'A4' }),
      receiptBill.save(),
    ]);

    await page.close();

    res.status(200).json({ response: savedReceipt });

    const mailOptions = {
      from: 'roughwebsevemail@gmail.com',
      to: email,
      subject: 'Your PDF Receipt',
      text: 'Please find your receipt attached.',
      attachments: [
        {
          filename: 'receipt.pdf',
          content: pdfBuffer,
          encoding: 'base64',
        },
      ],
    };

    transporter.sendMail(mailOptions).catch((err) => console.error('Error sending email:', err));
  } catch (error) {
    console.error('Error generating or sending PDF:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
};
