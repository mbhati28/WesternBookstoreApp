import React from "react";
import { useLocation } from "react-router-dom";

const BookDetails = () => {
  const location = useLocation();
  console.log(location);
  const book = location.state.book;
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
            <strong>Author:</strong> {book.volumeInfo.authors.join(", ")}
          </p>
        )}
        {book.saleInfo && book.saleInfo.retailPrice && (
          <p>
            <strong>Price:</strong> {book.saleInfo.retailPrice.amount}{" "}
            {book.saleInfo.retailPrice.currencyCode}
          </p>
        )}
        {book.volumeInfo.description && (
          <p>
            <strong>Description:</strong> {book.volumeInfo.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
