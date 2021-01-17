const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const path = require('path');

// Including JWT passport strategy
const jwtStrategy = require('./jwt/passport');

// Initializing dotenv config
dotenv.config();

const app = express();

// Establishing body parser
app.use(express.json());

// Establishing passport initialization
app.use(passport.initialize());

// Establishing JWT passport strategy
jwtStrategy(passport);

const PORT = process.env.PORT || 3000;

// Connection to DB 
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      auth: { user: process.env.DB_USER, password: process.env.DB_PASSWORD },
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    // Listening on provided port number if connection with the base is established
    if (process.env.NODE_ENV === 'production') {
      app.listen(PORT, () => {
        console.log('Successfully connected to MongoDB.');
        console.log('Listening on port: ', PORT);
      });
    }
  })
  .catch(console.error);

// Customers API route
const customersRouter = require('./routes/customer');

// Orders API route
const ordersRouter = require('./routes/order');

// Products API route
const productsRouter = require('./routes/product');

// Shippment API route
const shippmentRouter = require('./routes/shippment');

// Uploads API route
const uploadsRouter = require('./routes/uploads');

// Customers routing middleware
app.use('/api/customers', customersRouter);

// Orders routing middleware
app.use('/api/orders', ordersRouter);

// Products routing middleware
app.use('/api/products', productsRouter);

// Shippment routing middleware
app.use('/api/shippments', shippmentRouter);

// Uploads routing middleware
app.use('/api/uploads', uploadsRouter);

// Setting public folder for production
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../images')));

// Using express static folder
if (process.env.NODE_ENV === 'production') {
  //Handling images
  app.get('/images/:img', (req, res) => {
    return res.sendFile(process.cwd() + '/images/' + req.params.img);
  })

  //Handling VUE 
  app.get(/.*/, (req, res) => {
    return res.sendFile(process.cwd() + '/public/index.html');
  })
}

if (process.env.NODE_ENV === 'development') {
  module.exports = app.listen(PORT, () => { console.log('Listening on PORT:', PORT) });
}

