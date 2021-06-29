const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// Global Object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Routes
app.use('/v1', require('./routes/index'));

//Paypal config
app.get('/v1/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

//Middleware to handling errors
app.use(errorHandler);

const server = app.listen(process.env.PORT || 3001, function () {
    console.log(`Server Running in port ${server.address().port}`.yellow.bold);
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    server.close(() => process.exit(1));
});