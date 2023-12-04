import React, { useState, useContext } from 'react';
import { BooklistContext } from '../context/BookListContext';
import { updateBooklist } from '../services/booklistapi';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Booklist Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <label>
        Private Booklist
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
      </label>
      <button type="submit">Update Booklist</button>
    </form>
  );
};

export default EditBooklistForm;
