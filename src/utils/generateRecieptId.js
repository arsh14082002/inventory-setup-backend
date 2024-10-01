import receiptModel from '../models/reciept.js';

export const generateReceiptId = async () => {
  const today = new Date();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();
  const prefix = `${year}${month < 10 ? '0' + month : month}`;

  // Find the latest receipt for the current month and year
  const latestReceipt = await receiptModel
    .findOne({ receiptId: { $regex: `^${prefix}` } })
    .sort({ receiptId: -1 });

  let newReceiptNumber = 1; // Default value if no receipts found

  if (latestReceipt) {
    const lastReceiptNumber = parseInt(latestReceipt.receiptId.substring(6), 10);
    newReceiptNumber = lastReceiptNumber + 1;
  }

  return `${prefix}${newReceiptNumber.toString().padStart(4, '0')}`;
};
