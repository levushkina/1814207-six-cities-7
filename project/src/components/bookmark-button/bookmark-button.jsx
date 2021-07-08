import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../../store/api-actions';

function BookmarkButton({offerId, isActive, className, children}) {
  const dispatch = useDispatch();
  const handleBookmarkClick = () => {
    dispatch(addToFavorites(offerId, isActive ? 0 : 1));
  };

  return (
    <button
      className={`${className}__bookmark-button button ${isActive && className}__bookmark-button--active`}
      type="button"
      onClick={handleBookmarkClick}
    >
      {children}
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

BookmarkButton.propTypes = {
  offerId: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default BookmarkButton;
