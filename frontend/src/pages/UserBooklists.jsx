import React, { useEffect, useState, useContext } from "react";
import {
  getBooklistsByUser,
  deleteBooklist,
  removeBookFromBooklist,
} from "../services/booklistapi";
import { AuthContext } from "../context/AuthContext";
import EditBooklistForm from "./EditBooklistForm";
import { useNavigate } from "react-router-dom";

const UserBooklists = () => {
  const [booklists, setBooklists] = useState([]);
  const { authData } = useContext(AuthContext);
  const [editingBooklist, setEditingBooklist] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (booklist) => {
    if (editingBooklist && editingBooklist._id === booklist._id) {
      // If the same booklist is clicked again, close the form
      setEditingBooklist(null);
    } else {
      // Open the form for a different booklist
      setEditingBooklist(booklist);
    }
  };

  const navigateToNewComponent = (booklistId) => {
    navigate(`/booklistdetails/${booklistId}`);
  };

  const handleRemoveBook = async (booklist, bookId) => {
    try {
      await removeBookFromBooklist(booklist._id, bookId);
      // Update the state to remove the book from the booklist
      setBooklists((booklist) => ({
        ...booklist,
        books: booklist.books.filter((book) => book.googleBookId !== bookId),
      }));
      window.location.reload(true);
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
        setBooklists(
          booklists.filter((booklist) => booklist._id !== booklistId)
        );
      })
      .catch((error) => console.error(error));
  };

  if (!booklists || booklists.length === 0) {
    return (
      <div>
        <h2>Your Booklists</h2>
        <p>No booklists to display</p>
      </div>
    );
  }
  console.log(booklists);
  return (
    <div>
      <h2>Your Booklists</h2>
      {booklists.map((booklist) => (
        <div key={booklist._id}>
          <h3>{booklist.name}</h3>
          {booklists.map((booklist) => (
            <div key={booklist._id}>
              {booklist.books.map((book, index) => (
                <div key={index}>
                  {/* Book details */}
                  <p>{book.title}</p>
                  <img src={book.thumbnail} alt="" />
                  <button
                    onClick={() =>
                      handleRemoveBook(booklist, book.googleBookId)
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={() => handleEditClick(booklist)}>Edit</button>
              <button onClick={() => navigateToNewComponent(booklist._id)}>
                View Details
              </button>
            </div>
          ))}

          {editingBooklist && (
            <EditBooklistForm
              booklist={editingBooklist}
              onClose={() => setEditingBooklist(null)}
            />
          )}
          <button onClick={() => handleDelete(booklist._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserBooklists;
