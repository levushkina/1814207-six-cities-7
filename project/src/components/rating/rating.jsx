import React from 'react';
import PropTypes from 'prop-types';


function Rating({reviewRating, value, name, handleRatingChange, reviewIsSending}) {
  return (
    <>
      <input
        onChange={handleRatingChange}
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={reviewRating === value}
        disabled={reviewIsSending}
      />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={name}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  reviewIsSending: PropTypes.bool,
  reviewRating: PropTypes.number.isRequired,
};

export default Rating;
