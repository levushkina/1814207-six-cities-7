import React from 'react';
import PropTypes from 'prop-types';


function Rating(props) {
  const {value, name, handleRatingChange} = props;
  return (
    <>
      <input onChange={handleRatingChange} className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={name}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

Rating.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string,
  handleRatingChange: PropTypes.func,
};

export default Rating;
