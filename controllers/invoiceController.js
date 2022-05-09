const Invoice = require('../models/invoiceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeature');

exports.getAllInvoices = catchAsync(async (req, res, next) => {
  //todo: Execute query
  const features = new APIFeatures(Invoice.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  console.log(features);
  const invoices = await features.query;

  //Todo:send response
  res.status(200).json({
    status: 'sucess', // we are using the JSend response formatting protocol here
    results: invoices.length,
    data: {
      invoices,
    },
  });
});

exports.createInvoice = catchAsync(async (req, res, next) => {
  const newInvoice = await Invoice.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      Invoice: newInvoice,
    },
  });
});

exports.updateInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!invoice) {
    return next(new AppError('Cant find invoice with this ID', 404));
  }

  console.log(req.body);

  res.status(200).json({
    status: 'sucess', // we are using the JSend response formatting protocol here
    data: {
      invoice,
    },
  });
});

exports.deleteInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) {
    return next(new AppError('Cant find Invoice with this ID', 404));
  }
  res.status(204).json({
    status: 'sucess', // we are using the JSend response formatting protocol here
    data: null,
  });
});
