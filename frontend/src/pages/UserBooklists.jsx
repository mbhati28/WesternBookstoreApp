import React, { useEffect, useState, useContext } from "react";
import {
  getBooklistsByUser,
  deleteBooklist,
  removeBookFromBooklist,
} from "../services/booklistapi";
import { AuthContext } from "../context/AuthContext";
import EditBooklistForm from "./EditBooklistForm";
import { useNavigate } from "react-router-dom";
import "./UserBooklists.css"

const UserBooklists = () => {
  const [booklists, setBooklists] = useState([]);
  const { authData } = useContext(AuthContext);
  const [editingBooklist, setEditingBooklist] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (booklist) => {
    setEditingBooklist(editingBooklist && editingBooklist._id === booklist._id ? null : booklist);
  };

  const navigateToNewComponent = (booklistId) => {
    navigate(`/booklistdetails/${booklistId}`);
  };

  const handleRemoveBook = async (booklist, bookId) => {
    try {
      await removeBookFromBooklist(booklist._id, bookId);
      setBooklists((currentBooklists) =>
        currentBooklists.map((bl) =>
          bl._id === booklist._id
          ? { ...bl, books: bl.books.filter((book) => book.googleBookId !== bookId) }
          : bl
        )
      );
    } catch (error) {
      console.error("Error removing book from booklist:", error);
    }
  };

  useEffect(() => {
    if (authData) {
      getBooklistsByUser(authData._id)
        .then((response) => setBooklists(response))
        .catch((error) => console.error(error));
    }
  }, [authData]);

  const handleDelete = (booklistId) => {
    deleteBooklist(booklistId)
      .then(() => {
        setBooklists((currentBooklists) => currentBooklists.filter((booklist) => booklist._id !== booklistId));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="user-booklists">
      <h2>Your Booklists</h2>
      {booklists.length === 0 ? (
        <div className="empty-booklists">
          <p>No booklists to display</p>
        </div>
      ) : (
        booklists.map((booklist) => (
          <div key={booklist._id} className="booklist-container">
            <h3 className="booklist-title">{booklist.name}</h3>
            <div className="listing-row">
              {booklist.books.map((book, index) => (
                <div key={index} className="listing-item">
                  <img src={book.thumbnail} alt={book.title} className="listing-image" />
                  <div className="listing-info">
                    <p className="listing-title">{book.title}</p>
                    <button
                      onClick={() => handleRemoveBook(booklist, book.googleBookId)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="booklist-actions">
              <button onClick={() => handleEditClick(booklist)} className="edit-button">
                Edit
              </button>
              <button onClick={() => navigateToNewComponent(booklist._id)} className="view-details-button">
                View Details
              </button>
              <button onClick={() => handleDelete(booklist._id)} className="delete-button">
                Delete
              </button>
            </div>
            {editingBooklist && editingBooklist._id === booklist._id && (
              <EditBooklistForm
                booklist={editingBooklist}
                onClose={() => setEditingBooklist(null)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UserBooklists;
