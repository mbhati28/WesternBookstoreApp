const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const stripeRoutes = require('./routes/stripe.js');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.json()); // Enable JSON body parsing

//Stripe routes
app.use('/api', stripeRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
