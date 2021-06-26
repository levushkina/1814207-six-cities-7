import React from 'react';
import { sortOption } from '../../const';
import PropTypes from 'prop-types';


function SortOptionItem({type, sortType, onSortTypeChange}) {
  return (
    <li
      className={`places__option ${sortType === sortOption[type] && 'places__option--active'}`}
      tabIndex="0"
      onClick={(evt) => {
        evt.preventDefault();
        onSortTypeChange(sortOption[type]);
      }}
    >
      {sortOption[type]}
    </li>
  );
}

SortOptionItem.propTypes = {
  onSortTypeChange: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SortOptionItem;
