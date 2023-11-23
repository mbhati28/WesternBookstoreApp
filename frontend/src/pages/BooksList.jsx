import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm) {
            fetchBooks();
        }
    }, [searchTerm]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyB48Lo0vxO_yQqHUshxjpTsiRqn4QUZCNw&startIndex=1&maxResults=10`);
            setBooks(response.data.items || []);
        } catch (error) {
            console.error('Error fetching data from Google Books API:', error);
        }
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for books" />
            <button onClick={fetchBooks}>Search</button>
            <div>
                {books.map((book, index) => (
                    <div key={index}>
                        <h3>{book.volumeInfo.title}</h3>
                        {book.volumeInfo.authors && <p>Authors: {book.volumeInfo.authors.join(', ')}</p>}
                        {book.volumeInfo.publishedDate && <p>Published Date: {book.volumeInfo.publishedDate}</p>}
                        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksList;
