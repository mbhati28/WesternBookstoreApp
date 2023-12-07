import React, { useState, useContext } from 'react';
import { BooklistContext } from '../context/BookListContext';
import { updateBooklist } from '../services/booklistapi';
import './EditBooklistFormStyle.css'
const EditBooklistForm = ({ booklist, onClose }) => {
  const [name, setName] = useState(booklist.name);
  const [isPrivate, setIsPrivate] = useState(booklist.isPrivate);
  const [description, setDescription] = useState(booklist.description);
  const { clearBooklist } = useContext(BooklistContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { name, isPrivate, description, books: booklist.books };
      await updateBooklist(booklist._id, updatedData);
      clearBooklist();
      onClose(); // Close the form
    } catch (error) {
      console.error("Error updating booklist:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Booklist Name"
        required
        className="edit-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="edit-textarea"
      />
      <label>
              Private Booklist‎ ‎ ‎
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                id="private-booklist-checkbox"
                className="checkbox-custom-input"
              />
              <span className="checkbox-custom"></span>
            </label>
      <button type="submit" className="edit-submit">Update Booklist</button>
    </form>
  );
};

export default EditBooklistForm;
