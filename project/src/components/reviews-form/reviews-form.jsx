import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Rating from '../rating/rating';
import FormError from '../form-error/form-error';
import { RATINGS, ReviewsTextLimits } from '../../const';
import { getReviewIsSending, getReviewError } from '../../store/reviews/selectors';
import { useReviewsForm } from '../../hooks/use-reviews-form';
import { changeReviewSendingStatus } from '../../store/action';
import { postReview } from '../../store/api-actions';


function ReviewsForm({offerId}) {
  const reviewIsSending = useSelector(getReviewIsSending);
  const reviewError = useSelector(getReviewError);
  const [enableSubmit, handleRatingChange, handleReviewChange, onFormSubmit, reviewRating, reviewText] = useReviewsForm(reviewIsSending);
  const handleReviewTextChange = (event) => handleReviewChange(event.target.value);
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(changeReviewSendingStatus(true));
    dispatch(postReview(offerId, {comment: reviewText, rating: reviewRating}));
    onFormSubmit();
  };

  const ratingsItems = RATINGS.map((rating, i) => (
    <Rating
      key={rating}
      name={rating}
      value={RATINGS.length - i}
      reviewRating={reviewRating}
      onRatingChange={handleRatingChange}
      reviewIsSending={reviewIsSending}
    />
  ));

  return (
    <form onSubmit={handleFormSubmit} className="reviews__form form" action="#">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingsItems}
      </div>
      <textarea
        onChange={handleReviewTextChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        maxLength={ReviewsTextLimits.MAX}
        disabled={reviewIsSending}
        data-testid='rating-textarea'
      />
      {reviewError && <FormError errorText={reviewError}/>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!enableSubmit || reviewIsSending}>Submit</button>
      </div>
    </form>
  );
}

ReviewsForm.propTypes = {
  offerId: PropTypes.string.isRequired,
};

export default ReviewsForm;
