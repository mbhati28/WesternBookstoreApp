const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require("cors");
// require("dotenv").config();

dotenv.config();
app.use(cors());

const uri = process.env.MONGO_URL;
const pass = process.env.PASS_SEC;
console.log(pass);
mongoose
  .connect(
    "mongodb+srv://gagan:gagan@cluster0.svsii6u.mongodb.net/WesternBookStore?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log("Error is ", err);
  });

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.log(err));

// Routes
// app.use('/api/books', require('./routes/books'));

// app.use("/",(req,res)=>{
//     res.status(200).json({name:"hu"})
// })

// const PORT = process.env.PORT || 5588;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(process.env.PORT || 5151, () => {
  console.log("Backend working");
});

app.get("/api/test", () => {
  console.log("Helloooo");
});

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
