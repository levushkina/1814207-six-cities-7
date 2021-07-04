import React from 'react';
import PropTypes from 'prop-types';


function PropertyItem({property}) {
  return (
    <li className="property__inside-item">
      {property}
    </li>
  );
}

PropertyItem.propTypes = {
  property: PropTypes.string.isRequired,
};

export default PropertyItem;
