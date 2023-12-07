import React, { useContext } from 'react';
import { BooklistContext } from '../context/BookListContext';
import BooklistForm from '../components/BooklistForm';
import {Link} from 'react-router-dom';
import './BooklistCreateStyle.css'

const BookListPage = () => {
const booklist = JSON.parse(localStorage.getItem("booklistData"));
const {removeFromBooklist} = useContext(BooklistContext);

const handleRemove = (bookId) => {
  removeFromBooklist(bookId);
};

if (!booklist || booklist.length === 0) {
  return (<div className="create-empty"><h2>No books in your booklist.</h2>
      <br></br><br></br>
            <Link className="create-browse-button" to="/books">
                          <h3>Browse Books</h3>
                        </Link>
                        </div>

  );

}

return (
  <div className="create-booklist-container">
    <h1 className="create-booklist-title">Your Booklist</h1>
    <div className="create-books-container">
      {booklist.map((book, index) => (
        <div key={index} className="create-book-item">
          <h3 className="create-book-title">{book.volumeInfo.title}</h3>
          <p className="create-book-author">Author: {book.volumeInfo.authors.join(', ')}</p>
          {book.volumeInfo.imageLinks.thumbnail && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              className="create-book-image"
            />
          )}
          <button
            onClick={() => handleRemove(book.id)}
            className="create-remove-btn"
          >
            Remove from Booklist
          </button>
        </div>
          
        ))}
      </div>
      <BooklistForm></BooklistForm>
    </div>
  );
};

export default BookListPage;
