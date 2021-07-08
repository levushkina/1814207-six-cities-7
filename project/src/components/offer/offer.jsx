import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../header/header';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewsList from '../reviews-list/reviews-list';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import GalleryItem from '../gallery-item/gallery-item';
import PropertyItem from '../property-item/property-item';
import reviewsItemProp from '../reviews-item/reviews-item.prop';
import offerProp from '../offer/offer.prop';
import { PlacesListType, AuthorizationStatus } from '../../const';
import { fetchOffersItem, fetchOffersNearby, fetchOffersReviews } from '../../store/api-actions';
import { convertRatingToPercent } from '../../utils';


function Offer({reviews, offerItem, getOfferData, offerItemIsLoaded, offersNearby, offersNearbyIsLoaded, reviewsIsLoaded, status}) {
  const { id } = useParams();
  useEffect(() => {
    getOfferData(id);
  }, [id]);

  if (!offerItemIsLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  const images = offerItem.images.slice(0, 6);
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => <GalleryItem key={image} imageUrl={image}/>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offerItem.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offerItem.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{'width': convertRatingToPercent(offerItem.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offerItem.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerItem.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offerItem.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offerItem.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offerItem.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offerItem.goods.map((property) => <PropertyItem key={property} property={property}/>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offerItem.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offerItem.host.name}
                  </span>
                  {offerItem.host.isPro && (
                    <span className="property__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offerItem.description}
                  </p>
                </div>
              </div>
              {reviewsIsLoaded && (
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewsList reviews={reviews}/>
                  {status === AuthorizationStatus.AUTH && <ReviewsForm offerId={id}/>}
                </section>
              )}
            </div>
          </div>
          <section className="property__map map">
            {offersNearbyIsLoaded && <Map places={offersNearby}/>}
          </section>
        </section>
        <div className="container">
          {offersNearbyIsLoaded && (
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlacesList places={offersNearby} type={PlacesListType.NEAR}/>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

Offer.propTypes = {
  reviews: PropTypes.arrayOf(reviewsItemProp).isRequired,
  offersNearby: PropTypes.arrayOf(offerProp).isRequired,
  offerItem: offerProp,
  getOfferData: PropTypes.func.isRequired,
  offerItemIsLoaded: PropTypes.bool.isRequired,
  offersNearbyIsLoaded: PropTypes.bool.isRequired,
  reviewsIsLoaded: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offersNearby: state.offersNearby,
  offerItem: state.offerItem,
  offerItemIsLoaded: state.offerItemIsLoaded,
  offersNearbyIsLoaded: state.offersNearbyIsLoaded,
  reviewsIsLoaded: state.reviewsIsLoaded,
  reviews: state.reviews,
  status: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getOfferData(id) {
    dispatch(fetchOffersItem(id));
    dispatch(fetchOffersNearby(id));
    dispatch(fetchOffersReviews(id));
  },
});

export {Offer};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);
