const mongoose = require('mongoose');
const dotenv = require('dotenv');

//TODO: Catching uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION: Shutting down...');

  process.exit(1);
});

dotenv.config({ path: './config.env' }); //configuring environment variable

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//connecting our express app to mongodb
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection successful');
  });

const app = require('./app');


//4. starting up a server
// console.log(process.env)
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}`);
});

//TODO: handling unhandled Rejections in our app
process.on('unhandledRejection', (err) => {
    console.log(err);
    console.log('UNHANDLE REJECTION: Shutting down...');
    server.close(() => {
      process.exit(1);
    });
  });