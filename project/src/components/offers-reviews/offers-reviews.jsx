import React from 'react';
import { useSelector } from 'react-redux';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import PropTypes from 'prop-types';
import reviewsItemProp from '../reviews-item/reviews-item.prop';
import { AuthorizationStatus } from '../../const';
import { sortReviewsByDate } from '../../utils';
import { getAuthorizationStatus } from '../../store/user/selectors';


function OffersReviews({offerId, reviews}) {
  const status = useSelector(getAuthorizationStatus);
  const sortedReviews = sortReviewsByDate([...reviews]).splice(0, 10);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{sortedReviews.length}</span>
      </h2>
      <ReviewsList reviews={sortedReviews}/>
      {status === AuthorizationStatus.AUTH && <ReviewsForm offerId={offerId}/>}
    </section>
  );
}

OffersReviews.propTypes = {
  reviews: PropTypes.arrayOf(reviewsItemProp).isRequired,
  offerId: PropTypes.string.isRequired,
};

export default OffersReviews;
