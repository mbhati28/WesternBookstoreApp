const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const stripeRoutes = require('./routes/stripe.js');
require('dotenv').config();

const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200
};
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Use your Stripe routes
app.use('/api', stripeRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
