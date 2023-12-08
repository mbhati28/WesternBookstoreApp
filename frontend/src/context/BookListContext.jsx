import React, { createContext, useState, useEffect } from "react";

export const BooklistContext = createContext();

export const BooklistProvider = ({ children }) => {
  const [booklist, setBooklist] = useState([]);

  useEffect(() => {
    const storedBooklistData = localStorage.getItem("booklistData");
    if (storedBooklistData) {
      setBooklist(JSON.parse(storedBooklistData));
    }
  }, []);

  const addToBooklist = (book) => {
    setBooklist((current) => {
      if (current.length < 25) {
        // Check if the book is already in the booklist
        const isBookPresent = current.some((item) => item.id === book.id);
        if (!isBookPresent) {
          const updatedBooklist = [...current, book];
          localStorage.setItem("booklistData", JSON.stringify(updatedBooklist));
          return updatedBooklist;
        }
      } else {
        alert("Maximum of 25 books in a booklist reached.");
      }
      return current;
    });
  };

  const removeFromBooklist = (bookId) => {
    setBooklist((current) => {
      const updatedBooklist = current.filter(
        (book) => book.id !== bookId
      );
      localStorage.setItem("booklistData", JSON.stringify(updatedBooklist));
      return updatedBooklist;
    });
  };

  const clearBooklist = () => {
    setBooklist([]);
    localStorage.removeItem("booklistData");
  };

  return (
    <BooklistContext.Provider
      value={{ booklist, addToBooklist, removeFromBooklist, clearBooklist }}
    >
      {children}
    </BooklistContext.Provider>
  );
};
