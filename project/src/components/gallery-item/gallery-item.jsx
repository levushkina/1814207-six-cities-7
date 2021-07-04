import React from 'react';
import PropTypes from 'prop-types';


function GalleryItem({imageUrl}) {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={imageUrl} alt="Photo studio"/>
    </div>
  );
}

GalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default GalleryItem;
