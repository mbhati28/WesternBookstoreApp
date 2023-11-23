import React from 'react';

const BookItem = ({ book, onViewDetails, onAddToCart }) => {
    return (
        <div className="book-item">
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <h3>{book.volumeInfo.title}</h3>
            {book.volumeInfo.authors && <p>Authors: {book.volumeInfo.authors.join(', ')}</p>}
            {book.volumeInfo.publishedDate && <p>Published Date: {book.volumeInfo.publishedDate}</p>}

            <button onClick={() => onViewDetails(book)}>View Details</button>
            <button onClick={() => onAddToCart(book)}>Add to Cart</button>
        </div>
    );
};

export default BookItem;
