import React, { useContext } from 'react';
import { BooklistContext } from '../context/BookListContext';
import BooklistForm from '../components/BooklistForm';

const BookListPage = () => {
//   const { booklist } = useContext(BooklistContext);
const booklist = JSON.parse(localStorage.getItem("booklistData"));

  if (!booklist) {
    return <div>No books in your booklist.</div>;
  }
console.log(booklist);
  return (
    <div>
      <h1>Your Booklist</h1>
      <div>
        {booklist.map((book, index) => (
          <div key={index}>
            <h3>{book.volumeInfo.title}</h3>
            <p>Author: {book.volumeInfo.authors}</p>
            {book.volumeInfo.imageLinks.thumbnail && <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />}
          </div>
        ))}
      </div>
      <BooklistForm></BooklistForm>
    </div>
  );
};

export default BookListPage;
