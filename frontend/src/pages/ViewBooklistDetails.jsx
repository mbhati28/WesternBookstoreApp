import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsByBooklistId, createReview } from "../services/reviewApi";
import { fetchBooklistById } from "../services/booklistapi";
import { AuthContext } from "../context/AuthContext";
import ReviewForm from "./ReviewForm";
import BooklistItem from "../components/BooklistItem";
import "./BooklistDetails.css"

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
    <div>
      <h1>{booklist?.name}</h1>
      <div>
        {booklist?.books.map((book, index) => (
          <BooklistItem key={index} book={book} />
        ))}
      </div>
      <ReviewForm onCreateReview={handleCreateReview} />
      <div>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>{review.text}</p>
            <p>By: {review.username}</p>
            <p>On: {new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooklistDetails;
