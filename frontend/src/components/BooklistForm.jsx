import React, { useState, useContext } from "react";
import { BooklistContext } from "../context/BookListContext";
import { createBooklist, getBooklistsByUser } from "../services/booklistapi"; // Import the function from api.jsx
import { AuthContext } from "../context/AuthContext";

const BooklistForm = () => {
  const [booklistName, setBooklistName] = useState("");
  const { clearBooklist } = useContext(BooklistContext); // Assuming you have a clearBooklist function in your context
  const { authData } = useContext(AuthContext);
  const [isPrivate, setIsPrivate] = useState(true);
  const booklist = JSON.parse(localStorage.getItem("booklistData"));
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userBooklists = await getBooklistsByUser(authData._id);
    const userBooklistsCount = userBooklists.length;

    if (userBooklistsCount || userBooklistsCount < 20) {
      try {
        const transformedBooklist = booklist.map((book) => ({
          googleBookId: book.id, // or book.googleBookId, depending on your data structure
          title: book.volumeInfo.title,
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        }));
        await createBooklist(
          authData._id,
          booklistName,
          authData.username,
          transformedBooklist,
          isPrivate,
          description
        );
  
        setBooklistName("");
        setDescription("");
        setIsPrivate(true);
        clearBooklist();
        window.location.reload(true);
      } catch (error) {
        console.error("Error creating booklist:", error);
      }
    } 
    else {
      alert("Maximum of 20 booklists per user reached.");
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={booklistName}
        onChange={(e) => setBooklistName(e.target.value)}
        placeholder="Booklist Name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description for your booklist"
        rows="4"
      />
      <label>
        Private Booklist
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
      </label>
      <button type="submit">Create Booklist</button>
    </form>
  );
};

export default BooklistForm;
