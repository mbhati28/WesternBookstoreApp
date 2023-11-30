<<<<<<< HEAD
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BooksList from "./pages/BooksList";
import React from "react";
import BookDetails from "./pages/BookDetails";
import CartButton from "/src/components/CartButton.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage"; // Import the CartPage component
import "./App.css";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/canceled" element={<Cancel />} />
        </Routes>
        <Footer />
      </Router>
=======
import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
import { Signup } from "./Signup";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Signup onFormSwitch={toggleForm} />
      )}
>>>>>>> Google-login
    </div>
  );
}

export default App;
