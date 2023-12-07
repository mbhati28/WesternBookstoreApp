import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsByBooklistId, createReview } from "../services/reviewApi";
import { fetchBooklistById } from "../services/booklistapi";
import { AuthContext } from "../context/AuthContext";
import ReviewForm from "./ReviewForm";
import BooklistItem from "../components/BooklistItem";
import "./ViewBooklistDetails.css"

const BooklistDetails = () => {
  const [booklist, setBooklist] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { booklistId } = useParams();
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedBooklist = await fetchBooklistById(booklistId);
        setBooklist(fetchedBooklist);

        const fetchedReviews = await fetchReviewsByBooklistId(booklistId);
        setReviews(
          fetchedReviews.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (error) {
        console.error("Error loading booklist or reviews:", error);
      }
    };

    loadData();
  }, [booklistId]);

  const handleCreateReview = async (text, rating) => {
    try {
      const newReview = await createReview({
        booklistId,
        userId: authData._id,
        username: authData.username,
        text
      });
      setReviews([newReview, ...reviews]);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div className="details-wrapper">
      <h1 className="details-title">{booklist?.name}</h1>
      <div className="items-grid">
        {booklist?.books.map((book, index) => (
          <div className="grid-item" key={index}>
            <img src={book.thumbnail} alt={book.title} className="item-cover" />
            <div className="item-details">
              <div className="item-title">{book.title}</div>
            </div>
          </div>
        ))}
      </div>
          <div className="review-form-container">
            <ReviewForm onCreateReview={handleCreateReview} />
          </div>
          <div className="reviews-container">
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p className="review-text">{review.text}</p>
                <p className="review-author">By: {review.username}</p>
                <p className="review-date">On: {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
  );
};

export default BooklistDetails;
