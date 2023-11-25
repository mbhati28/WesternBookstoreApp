import React, { useState } from "react";

const BookFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({
    author: "",
    genre: "",
    title: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filter);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={filter.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="author"
        value={filter.author}
        onChange={handleChange}
        placeholder="Author"
      />
      <input
        type="text"
        name="genre"
        value={filter.genre}
        onChange={handleChange}
        placeholder="Genre"
      />
      <input
        type="text"
        name="language"
        value={filter.language}
        onChange={handleChange}
        placeholder="Language"
      />
      <div><button type="submit">Apply Filters</button></div>
      
    </form>
  );
};

export default BookFilter;
