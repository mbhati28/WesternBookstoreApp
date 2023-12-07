import React from 'react';
import { Link } from 'react-router-dom';
import './CancelStyle.css';

const Cancel = () => {
  return (
    <div className="cancel-page">
      <div className="cancel-message">
        <h2>You order has been cancelled. Would you like to buy something else?</h2>
        <br /><br />
        <Link className="cancel-button" to="/books">
          Browse Books
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
