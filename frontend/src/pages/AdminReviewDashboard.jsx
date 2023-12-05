import React, { useEffect, useState } from 'react';
import { getAllReviews, updateReviewVisibility} from '../services/reviewApi';

const AdminReviewDashboard = () => {

const [reviews, setReviews] = useState([]);

useEffect(() => {
    const fetchReviews = async () => {
        const fetchedReviews = await getAllReviews();
        setReviews(fetchedReviews);
    };
    fetchReviews();
}, []);

const handleToggleVisibility = async (reviewId, currentVisibility) => {
    try {
      await updateReviewVisibility(reviewId, !currentVisibility);
      setReviews(reviews.map(review => {
        if (review._id === reviewId) {
          return { ...review, isHidden: !currentVisibility };
        }
        return review;
      }));
    } catch (error) {
      console.error('Error updating review visibility:', error);
    }
  };

  return (
    <div>
      <h2>Reviews Management</h2>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <p>{review.text}</p>
          <p>By: {review.username}</p>
          <p>On: {new Date(review.createdAt).toLocaleDateString()}</p>
          <button onClick={() => handleToggleVisibility(review._id, review.isHidden)}>
            {review.isHidden ? 'Unhide' : 'Hide'}
          </button>
        </div>
      ))}
    </div>
  );

}

export default AdminReviewDashboard;
