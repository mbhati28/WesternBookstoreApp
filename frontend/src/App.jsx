import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BooksList from "./pages/BooksList";
import React from "react";
import BookDetails from "./pages/BookDetails";
import { CartProvider } from './context/CartContext';
import CartComponent from '../components/CartComponent.jsx';
import CartButton from '../components/CartButton.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        </Routes>
        <CartProvider>
              <CartComponent />
              <CartButton />
              {/* Rest of your app components */}
            </CartProvider>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
