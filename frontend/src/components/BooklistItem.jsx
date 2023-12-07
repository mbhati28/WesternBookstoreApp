import React from 'react';

const BooklistItem = ({ book }) => {
    return (
        <div>
            <img src={book.thumbnail} alt={book.title} />
            <h3>{book.title}</h3>
        </div>
    );
};

export default BooklistItem;