import mongoose from 'mongoose';

const reciptSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      hsn: {
        type: String, // Add HSN code
        required: true,
      },
      description: {
        type: String, // Add product description
        required: true,
      },
      taxPercent: {
        type: Number,
        // required: true,
      },
      productTotalAmount: {
        type: Number,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  receiptId: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  paymentStatus: {
    type: String,
    default: 'pending',
  },
  amountPaid: {
    type: Number,
    // required: true, // Add amount paid
  },
  paymentMode: {
    type: String,
    default: 'cash',
  },
  totalAmount: {
    type: Number,
    required: true,
  },

  dues: {
    type: Number, // Add dues (remaining amount)
    // required: true,
  },
});

const receiptModel = mongoose.model('Reciept', reciptSchema);
export default receiptModel;
