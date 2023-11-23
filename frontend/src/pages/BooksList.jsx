import React, { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "../components/BookItem";
import BookFilter from "../components/BookFilter";
import './BooksList.css';


const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("science");

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyB48Lo0vxO_yQqHUshxjpTsiRqn4QUZCNw`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFilterChange = (filter) => {
    // Construct your query based on the filters
    let query = [];
    if (filter.title) query.push(`intitle:${filter.title}`);
    if (filter.author) query.push(`inauthor:${filter.author}`);
    if (filter.genre) query.push(`subject:${filter.genre}`);
    if (filter.language) query.push(`langRestrict:${filter.language}`);

    fetchBooks(query.join("+"));
  };

  useEffect(() => {
    fetchBooks("happy-living"); // Fetch initial set of books or provide a default query
  }, []);

  const handleViewDetails = (book) => {
    // Placeholder for view details logic
    console.log("Viewing details for:", book.volumeInfo.title);
  };

  const handleAddToCart = (book) => {
    // Placeholder for add to cart logic
    console.log("Adding to cart:", book.volumeInfo.title);
  };

  return (
    <div className="books-list-container">
      <div className="filter-column">
        <BookFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="books-column">
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
    </div>
  );
};

export default BooksList;
