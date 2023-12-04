import React, { useState } from 'react';

const ReviewForm = ({ onCreateReview }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateReview(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} required />
            <button type="submit">Post Review</button>
        </form>
    );
};

export default ReviewForm;
