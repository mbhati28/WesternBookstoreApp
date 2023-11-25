import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BooksList from "./pages/BooksList";
import React from "react";
import BookDetails from "./pages/BookDetails";
import { CartProvider } from './context/CartContext';
import CartComponent from '/src/components/CartComponent.jsx';
import CartButton from '/src/components/CartButton.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
     <CartProvider> {/* Wrap your app with CartProvider */}
       <div className="container-fluid">
         <Router>
           <Navbar />
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/books" element={<BooksList />} />
             <Route path="/book/:id" element={<BookDetails />} />
             <Route path="/cart" element={<CartComponent />} />
           </Routes>
           <Footer />
         </Router>
       </div>
     </CartProvider>
  );
}

export default App;
