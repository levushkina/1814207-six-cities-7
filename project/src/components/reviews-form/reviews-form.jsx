import React, {useState} from 'react';
import Rating from '../rating/rating';
import {RATINGS} from '../../const';


function ReviewsForm() {

  const [reviewRating, setReviewRating] = useState(1);
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (event) => {
    setReviewRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rating, i) => <Rating key={rating} name={rating} value={RATINGS.length - i} reviewRating={reviewRating} handleRatingChange={handleRatingChange}/>)}
      </div>
      <textarea onChange={handleReviewChange} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={reviewText}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
