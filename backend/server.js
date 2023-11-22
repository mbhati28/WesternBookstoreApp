const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

// Routes
// app.use('/api/books', require('./routes/books'));

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));