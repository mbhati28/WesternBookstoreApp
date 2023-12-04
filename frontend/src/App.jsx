import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import BooksList from "./pages/BooksList";
import React from "react";
import BookDetails from "./pages/BookDetails";
import CartButton from "/src/components/CartButton.jsx";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage"; // Import the CartPage component
import "./App.css";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Signup from "./components/Signup";
import Order from "./pages/Order";
import BookListPage from "./pages/BookListPage";
import DisplayBooklist from "./pages/DisplayBooklist";
import ViewBooklistDetails from "./pages/ViewBooklistDetails";
import UserBooklists from "./pages/UserBooklists";

function App() {
  return (
    <div className="container-fluid">
      <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createbooklist" element={<BookListPage />} />
          <Route path="/booklist" element={<DisplayBooklist />} />
          <Route path="/booklistdetails/:booklistId" element={<ViewBooklistDetails />} />
          <Route path="/mybooklist" element={<UserBooklists />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment/success" element={<Success />} />
          <Route path="/payment/canceled" element={<Cancel />} />
        </Routes>
        </div>
        <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
