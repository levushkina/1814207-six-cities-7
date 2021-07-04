import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeReviewSendingStatus } from '../../store/action';
import PropTypes from 'prop-types';
import Rating from '../rating/rating';
import FormError from '../form-error/form-error';
import { RATINGS, ReviewsTextLimits } from '../../const';
import { postReview } from '../../store/api-actions';
import { getReviewIsSending, getReviewError } from '../../store/reviews/selectors';


function ReviewsForm({offerId, onSubmit, reviewIsSending, reviewError}) {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const formValidate = () => (
    reviewRating && ReviewsTextLimits.MAX >= reviewText.length && reviewText.length >= ReviewsTextLimits.MIN
  );

  const handleRatingChange = (event) => {
    setReviewRating(Number(event.target.value));
    setEnableSubmit(formValidate());
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
    setEnableSubmit(formValidate());
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(offerId, {comment: reviewText, rating: reviewRating});
    setReviewRating(0);
    setReviewText('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rating, i) => (
          <Rating
            key={rating}
            name={rating}
            value={RATINGS.length - i}
            reviewRating={reviewRating}
            handleRatingChange={handleRatingChange}
            disabled={reviewIsSending}
          />
        ))}
      </div>
      <textarea
        onChange={handleReviewChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        maxLength="300"
        disabled={reviewIsSending}
      />
      <FormError errorText={reviewError}/>
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
  onSubmit: PropTypes.func.isRequired,
  reviewIsSending: PropTypes.bool.isRequired,
  reviewError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  reviewIsSending: getReviewIsSending(state),
  reviewError: getReviewError(state),
});


const mapDispatchToProps = (dispatch) => ({
  onSubmit(id, data) {
    dispatch(changeReviewSendingStatus(true));
    dispatch(postReview(id, data));
  },
});

export {ReviewsForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);
