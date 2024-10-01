export const pdfTemplate = ({
  products = [],
  name,
  receiptId,
  discount,
  paymentStatus,
  amountPaid,
  paymentMode,
  phone,
  shopkeeperName,
  shopkeeperAddress,
  shopkeeperPhone,
  shopkeeperEmail,
}) => {
  const today = new Date();

  let totalAmount = 0;
  products.forEach((product) => {
    const price = parseFloat(product.price) || 0;
    const taxPercent = parseFloat(product.taxPercent) || 0;
    totalAmount += product.productTotalAmount;
  });

  const discountAmount = parseFloat(discount) || 0;
  const finalAmount = totalAmount - discountAmount;
  const paidAmount = parseFloat(amountPaid) || 0;
  const duesAmount = finalAmount - paidAmount;

  let paymentMessage = '';
  if (paymentStatus) {
    paymentMessage =
      duesAmount > 0
        ? `Thank you for your payment. Dues Amount: ${duesAmount.toFixed(2)}$`
        : `Thank you for your payment. No dues remaining.`;
  } else {
    paymentMessage = `Thank you for your order.`;
  }

  return `
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8" />
       <title>PDF Result Template</title>
       <style>
         body {
           font-family: 'Arial', sans-serif;
           color: #333;
           background-color: #f9f9f9;
           margin: 0;
           padding: 0;
         }
         .invoice-box {
           max-width: 800px;
           margin: auto;
           padding: 30px;
           border: 1px solid #ddd;
           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
           background-color: #fff;
         }
         .invoice-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           border-bottom: 1px solid #ddd;
           padding-bottom: 20px;
         }
         .invoice-header img {
           max-width: 150px;
         }
         .invoice-header .info {
           text-align: right;
         }
         .invoice-header .info span {
           display: block;
         }
         .shopkeeper-info {
           margin-top: 10px;
           text-align: right;
         }
         .invoice-body {
           margin-top: 20px;
         }
         .invoice-body table {
           width: 100%;
           border-collapse: collapse;
         }
         .invoice-body table th,
         .invoice-body table td {
           padding: 10px;
           border: 1px solid #ddd;
           text-align: left;
         }
         .invoice-body table th {
           background-color: #f0f0f0;
           font-weight: bold;
         }
         .invoice-body table td {
           background-color: #fff;
         }
         .invoice-body .total {
           font-weight: bold;
           text-align: right;
         }
         .invoice-footer {
           margin-top: 30px;
           text-align: center;
         }
         @media only screen and (max-width: 600px) {
           .invoice-header {
             flex-direction: column;
             align-items: flex-start;
           }
           .invoice-header .info {
             text-align: left;
           }
         }
       </style>
     </head>
     <body>
       <div class="invoice-box">
         <div class="invoice-header">
           <img
             src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
             alt="Logo"
           />
           <div class="info">
               <span>${receiptId}</span>
             <span>${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`}</span>
           </div>
         </div>
         <div class="shopkeeper-info" style="display: flex; flex-direction: column; gap:3px; justify-content:flex-end">
           <span><b>${shopkeeperName || 'Secure Yourself'}</b></span>
           <span>${shopkeeperAddress || 'Aya Nagar, New Delhi'}</span>
           <a href="tel:+91${
             shopkeeperPhone || '9999629495'
           }" style="text-decoration:none; font-weight: 600">${
    shopkeeperPhone || '+91 9999 62 9495'
  }</a>
           <a href="sendto:">Email: ${shopkeeperEmail || 'thesiddiqui7@gmail.com'}</a>
         </div>
         <div class="invoice-body">
           <div>
             <div>
               <p>Custumer Name: ${name}</p>
               <p>${'Aya Nagar, New Delhi'}</p>
               <p><b>${phone}</b></p>
             </p>
           </div>
           <table>
             <thead>
               <tr>
                 <th>Product Name</th>
                 <th>HSN Code</th>
                 <th>Description</th>
                 <th>Price Without Tax</th>
                 <th>Tax Percent</th>
                 <th>Total Price After Tax</th>
               </tr>
             </thead>
             <tbody>
               ${products
                 .map(
                   (product) => `
               <tr>
                 <td>${product.product || 'N/A'}</td>
                 <td>${product.hsn || 'N/A'}</td>
                 <td>${product.description || 'N/A'}</td>
                 <td>${parseFloat(product.price).toFixed(2)}$</td>
                 <td>${parseFloat(product.taxPercent).toFixed(2)}%</td>
                 <td>${parseFloat(product.productTotalAmount).toFixed(2)}$</td>
               </tr>
               `,
                 )
                 .join('')}
             </tbody>
           </table>
           <table>
             <tr>
               <td colspan="5">Discount</td>
               <td>${discount || '0.00'}$</td>
             </tr>
             <tr class="total">
               <td colspan="5">Total Price</td>
               <td>${finalAmount.toFixed(2)}$</td>
             </tr>
             <tr class="total">
               <td colspan="5">Amount Paid</td>
               <td>${paidAmount.toFixed(2)}$</td>
             </tr>
             <tr class="total">
               <td colspan="5">Amount Due</td>
               <td>${duesAmount.toFixed(2)}$</td>
             </tr>
           </table>
           <div class="invoice-footer">
             <p>${paymentMessage}</p>
           </div>
         </div>
       </div>
     </body>
   </html>
     `;
};
