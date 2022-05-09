const mongoose = require('mongoose');
const validator = require('validator');

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paymentDue: Date,
  description: String,
  paymentTerms: {
    type: Number,
    enum: [1, 7, 14, 30],
  },
  clientName: String,
  clientEmail: {
    type: String,
    unique: true,
    required: [true, 'User must have an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valide Email'],
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'draft'],
  },
  senderAddress: {
    type: Map,
    of: new Schema({
      street: String,
      city: String,
      postCode: String,
      country: String,
    }),
  },
  clientAddress: {
    type: Map,
    of: new Schema({
      street: String,
      city: String,
      postCode: String,
      country: String,
    }),
  },
  items: {
    type: [
      {
        name: String,
        quantity: Number,
        price: Number,
        total: Number,
      },
    ],
    default: undefined,
  },
  total: Number,
});

//creating a model from the invoice schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
