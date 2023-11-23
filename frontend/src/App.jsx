import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Footer from "./components/Footer";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
