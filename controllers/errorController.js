const AppError = require('../utils/appError')

// const handleErrorDB = (err) => {
//     const message = `invalid ${err.path}: ${err.value}`;
//     return new AppError(message, 400);
//   };
  
//   const handleDuplicateFieldsDB = (err) => {
//     const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//     const message = `Duplicate dield value ${value}. Please use another value`;
//     return new AppError(message, 400);
//   };
  
//   const handleValidationError = (err) => {
//     const errors = Object.values(err.errors).map((el) => el.message);
  
//     const message = `Invalid Input data. ${errors.join('. ')}`;
//     return new AppError(message, 400);
//   };
  

module.exports = (err, req, res, next) => {
    // err.statusCode = err.statusCode || 500;
    // err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      });
  
    
    //   let error = { ...err };
    //   if (error.name === 'CastError') error = handleErrorDB(error);
    //   if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    //   if (error.name === 'ValidationError') error = handleValidationError(error);
      
      
  };