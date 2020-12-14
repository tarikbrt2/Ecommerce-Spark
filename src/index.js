const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

// Initializing dotenv config
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Including models
const { Customer, Order, Shippment, Product } = require('./models/models');

// Including validation
const { customerValidation, orderValidation, shippmentValidation, productValidation } = require('./validation/validation');

// Connection to DB 
mongoose
  .connect(
    'mongodb+srv://cluster0.xvjgt.mongodb.net/ecommerce?retryWrites=true&w=majority',
    {
      auth: { user: process.env.DB_USER, password: process.env.DB_PASSWORD },
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    // Listening on provided port number if connection with the base is established
    app.listen(PORT, () => {
      if(process.env.NODE_ENV === 'development'){
        console.log('Successfully connected to MongoDB.');
        console.log('Listening on port: ', PORT);
      }
    });
  }
  )
  .catch(console.error);

// Customers API route
const customersRouter = require('./routes/customer');

// Orders API route
const ordersRouter = require('./routes/order');

// Products API route
const productsRouter = require('./routes/product');

// Shippment API route
const shippmentRouter = require('./routes/shippment');

// Customers routing middleware
app.use('/api/customers', customersRouter);

// Orders routing middleware
app.use('/api/orders', ordersRouter);

// Products routing middleware
app.use('/api/products', productsRouter);

// Shippment routing middleware
app.use('/api/shippments', shippmentRouter);

