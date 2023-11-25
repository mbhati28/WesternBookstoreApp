import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BooksList from "./pages/BooksList";
import React from "react";
import BookDetails from "./pages/BookDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from './pages/CartPage'; // Import the CartPage component
import "./App.css";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
