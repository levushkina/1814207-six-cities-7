import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import offerProp from '../offer/offer.prop';
import { convertRatingToPercent } from '../../utils';
import { PlacesListType, PlaceCardClassName, BookmarkClass } from '../../const';
import BookmarkButton from '../bookmark-button/bookmark-button';


function PlaceCard({place, onPlaceMouseOver, type = PlacesListType.MAIN}) {
  const handlePlaceMouseOver = () => onPlaceMouseOver(place.id);

  return (
    <article className={`place-card ${PlaceCardClassName[type]}`} onMouseOver={handlePlaceMouseOver}>
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${place.id}`}>
          <img className="place-card__image" src={place.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton offerId={place.id} isActive={place.isFavorite} className={BookmarkClass.OFFER_LIST}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
          </BookmarkButton>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{'width': convertRatingToPercent(place.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>{place.title}</Link>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  place: offerProp,
  onPlaceMouseOver: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export { PlaceCard };
export default React.memo(PlaceCard);
