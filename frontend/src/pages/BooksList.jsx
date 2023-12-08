import React, { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "../components/BookItem";
import BookFilter from "../components/BookFilter";
import "./BooksList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("gre");
  const [totalPages, setTotalPages] = useState(1);
  const maxResults = 12;
  const maxPageNumbers = 10;

  const fetchBooks = async (query, startIndex) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=AIzaSyB48Lo0vxO_yQqHUshxjpTsiRqn4QUZCNw`
      );
      console.log(response);
      setBooks(response.data.items || []);
      setTotalPages(Math.ceil(response.data.totalItems / maxResults));
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

    const newQuery = query.join("+");
    setCurrentQuery(newQuery);
    setCurrentPage(1); // Reset to the first page when filters change
    fetchBooks(newQuery, 0); // Fetch books starting from the first page
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * maxResults;
    console.log("The start index is: ", startIndex);
    fetchBooks(currentQuery, startIndex); // Fetch initial set of books or provide a default query
  }, [currentPage, currentQuery, maxResults]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPage = Math.min(currentPage + maxPageNumbers - 1, totalPages);

    const startPage = Math.max(1, maxPage - maxPageNumbers + 1);
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log("current page is: ", currentPage);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleViewDetails = (book) => {
    console.log("Viewing details for:", book.volumeInfo.title);
  };

  const handleAddToCart = (book) => {
    console.log("Adding to cart:", book.volumeInfo.title);
  };

  return (
    <div className="books-list-container container-fluid">
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
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksList;
