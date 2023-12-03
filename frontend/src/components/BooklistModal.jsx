import React from "react";

const BooklistModal = ({ booklist, closeModal }) => {
  return (
    <div className="booklist-modal">
      <div className="booklist-modal-header">
        <h2>{booklist.name}</h2>
        <button onClick={closeModal} className="close-modal-btn">
          X
        </button>
      </div>
      <div className="booklist-modal-content">
        {booklist.books.map((book, index) => (
          <div key={index} className="modal-book-item">
            <img
              src={book.thumbnail}
              alt={book.title}
              className="modal-book-thumbnail"
            />
            <div className="modal-book-info">
              <h4>{book.title}</h4>
              
              {/* Other book details can go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooklistModal;
