import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import PropTypes from 'prop-types';
import { fetchOffersReviews } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { getReviews, getReviewsIsLoaded } from '../../store/reviews/selectors';
import { getAuthorizationStatus } from '../../store/user/selectors';


function OffersReviews({offerId}) {
  const dispatch = useDispatch();
  const status = useSelector(getAuthorizationStatus);
  const reviews = useSelector(getReviews);
  const reviewsIsLoaded = useSelector(getReviewsIsLoaded);

  useEffect(() => {
    if (!reviewsIsLoaded) {
      dispatch(fetchOffersReviews(offerId));
    }
  }, [reviews, dispatch]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        {reviewsIsLoaded && (<span className="reviews__amount">{reviews.length}</span>)}
      </h2>
      {reviewsIsLoaded && (<ReviewsList reviews={reviews}/>)}
      {status === AuthorizationStatus.AUTH && <ReviewsForm offerId={offerId}/>}
    </section>

  );
}

OffersReviews.propTypes = {
  offerId: PropTypes.string.isRequired,
};

export default OffersReviews;
