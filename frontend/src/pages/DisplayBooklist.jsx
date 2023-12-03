import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllBooklists } from "../services/booklistapi"; // Import API call
import BooklistModal from "../components/BooklistModal";
import "./DisplayBooklist.css";

const DisplayBooklist = () => {
  const [booklists, setBooklists] = useState([]);
  const [selectedBooklist, setSelectedBooklist] = useState(null);
  const { authData } = useContext(AuthContext);

  const openModal = (booklist) => {
    setSelectedBooklist(booklist);
  };

  const closeModal = () => {
    setSelectedBooklist(null);
  };

  useEffect(() => {
    const fetchBooklists = async () => {
      try {
        const response = await getAllBooklists();
        // Sort booklists by date (assuming each booklist has a 'createdAt' property)
        const sortedBooklists = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        if (authData) {
          // If user is authenticated, use all booklists
          setBooklists(sortedBooklists);
        } else {
          // If user is not authenticated, use only the latest 10 booklists
          setBooklists(sortedBooklists.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching booklists:", error);
      }
    };

    fetchBooklists();
  }, [authData]);

  return (
    <div>
      <h2>Booklists</h2>
      <div className="booklists-container">
        {booklists.map((booklist, index) => (
          <div key={index} className="booklist">
            <div className="booklist-info">
              <h3>{booklist.name}</h3>
              <p>Created by: {booklist.username}</p>{" "}
              <p>
                Created on: {new Date(booklist.createdAt).toLocaleDateString()}
              </p>
              <p>{booklist.description}</p>
            </div>
            <button onClick={() => openModal(booklist)}>View Details</button>
          </div>
        ))}
      </div>
      {selectedBooklist && (
        <BooklistModal booklist={selectedBooklist} closeModal={closeModal} />
      )}
    </div>
  );
};

export default DisplayBooklist;
