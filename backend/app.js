require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const firebase = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json')

//swagger
const swaggerUI = require("swagger-ui-express");
let swaggerDocument = require('./swagger-config.json');

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());

// Morgan setup for logging requests
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware for response logging
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    // console.log("Response:", data); // log the response body
    originalSend.call(this, data);
  };
  next();
});

// Initialize Firebase Admin SDK
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

// Import routes
const routes = require('./src/routes');
app.use("/uploads", express.static("uploads"))
app.use('/api', routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});