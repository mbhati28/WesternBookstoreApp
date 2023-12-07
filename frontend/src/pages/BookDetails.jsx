import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./BookDetails.css";
import { addToCart } from "../services/api";
import { AuthContext } from '../context/AuthContext';
import { useCart } from "../context/CartContext";
import {Link} from 'react-router-dom';

const BookDetails = () => {
  const location = useLocation();
  console.log(location);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const book = location.state.book;
  const {authData} = useContext(AuthContext);
  const { onAdd } = useCart();
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const isPriceAvailable = book.saleInfo && book.saleInfo.listPrice;
  const handleAddToCart = () => {
    const userid = authData._id;
    onAdd(book);
    addToCart(userid, book);
    alert("Added to Cart!");
  };

  return (
    <div className="book-details">
      <div className="col-lg-3">
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        )}
      </div>
      <div className="col-lg-10">
        <h2>{book.volumeInfo.title}</h2>
        {book.volumeInfo.authors && (
          <p>
            <strong></strong> {book.volumeInfo.authors.join(", ")}
          </p>
        )}
        {book.saleInfo && book.saleInfo.retailPrice && (
          <p className="price">
            ${book.saleInfo.retailPrice.amount}{" "}
            {book.saleInfo.retailPrice.currencyCode}
          </p>
        )}
        {book.volumeInfo.description && (
          <p className={`description ${showFullDescription ? "expanded" : ""}`}>
            {book.volumeInfo.description}
          </p>
        )}
        <button onClick={toggleDescription}>
          {showFullDescription ? "Show Less" : "Show More"}
        </button>
        <br /><br />
        <button onClick={handleAddToCart} disabled={!isPriceAvailable}>
          Add to Cart
        </button><br /><br />
        <Link className="home-button" to="/books">
                                  Browse Books
                                </Link>
      </div>
    </div>
  );
};

export default BookDetails;
