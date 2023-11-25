import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const location = useLocation();
  console.log(location);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const book = location.state.book;
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
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
      </div>
    </div>
  );
};

export default BookDetails;
