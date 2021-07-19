import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import Header from '../header/header';
import OffersReviews from '../offers-reviews/offers-reviews';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import GalleryItem from '../gallery-item/gallery-item';
import PropertyItem from '../property-item/property-item';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { PlacesListType, BookmarkClass, AppRoute } from '../../const';
import { fetchOffersNearby, fetchOffersReviews } from '../../store/api-actions';
import { convertRatingToPercent, getOffersByIds } from '../../utils';
import { getReviews, getReviewsIsLoaded } from '../../store/reviews/selectors';
import { getOffersIsLoaded, getOffersNearbyIsLoaded, getOffersNearby, getOffers } from '../../store/offers/selectors';


function Offer() {
  const { id } = useParams();
  const offers = useSelector(getOffers);
  const offersNearbyIds = useSelector(getOffersNearby);
  const offerItem = offers.find((offer) => offer.id === Number(id));
  const offerItemIsLoaded = useSelector(getOffersIsLoaded);
  const offersNearbyIsLoaded = useSelector(getOffersNearbyIsLoaded);
  const reviews = useSelector(getReviews);
  const reviewsIsLoaded = useSelector(getReviewsIsLoaded);
  const dispatch = useDispatch();
  const offersNearby = getOffersByIds(offers, offersNearbyIds);

  useEffect(() => {
    if (offerItem) {
      dispatch(fetchOffersNearby(id));
      dispatch(fetchOffersReviews(id));
    }
  }, [id, offerItem, dispatch]);

  if (!offerItemIsLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  if (!offerItem) {
    return (
      <Redirect to={AppRoute.NOT_FOUND} />
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
                <BookmarkButton offerId={offerItem.id} isActive={offerItem.isFavorite} className={BookmarkClass.OFFER_CARD}>
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                </BookmarkButton>
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
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${offerItem.host.isPro && 'property__avatar-wrapper--pro'}`}>
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
              {reviewsIsLoaded && (<OffersReviews offerId={id} reviews={reviews} />)}
            </div>
          </div>
          <section className="property__map map">
            {offersNearbyIsLoaded && <Map places={offersNearby.concat([offerItem])} activeCardId={Number(id)}/>}
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

export default Offer;
