import React, { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "../components/BookItem"; // Assuming you have a BookItem component as described earlier

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      fetchBooks();
    }
  }, [searchTerm]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyB48Lo0vxO_yQqHUshxjpTsiRqn4QUZCNw`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching data from Google Books API:", error);
    }
  };

  const handleViewDetails = (book) => {
    // Placeholder for view details logic
    console.log("Viewing details for:", book.volumeInfo.title);
  };

  const handleAddToCart = (book) => {
    // Placeholder for add to cart logic
    console.log("Adding to cart:", book.volumeInfo.title);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books"
      />
      <button onClick={fetchBooks}>Search</button>
      <div className="books-grid">
        {books.map((book, index) => (
          <BookItem
            key={book.id} // It's better to use a unique identifier like book.id
            book={book}
            onViewDetails={() => handleViewDetails(book)}
            onAddToCart={() => handleAddToCart(book)}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
