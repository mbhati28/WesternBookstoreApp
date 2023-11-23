import React, { useState, useEffect } from 'react';
import axios from "axios"

const Books = () => {
   const fetchBooks = async (query) => {
   const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyB48Lo0vxO_yQqHUshxjpTsiRqn4QUZCNw`);
   return response.data.items;
    }

  return (
    <div>Books</div>
  )
}

export default Books