import React, { useState } from 'react';
import { SORT_TYPES } from '../../const';
import SortOptionItem from '../sort-option-item/sort-option-item';
import PropTypes from 'prop-types';

function SortingForm({sortType, onSortTypeChange}) {
  const [sortingPopupView, setSortingPopupView] = useState(false);
  const handleSortingClick = () => {
    setSortingPopupView(!sortingPopupView);
  };
  const sortOptionItems = SORT_TYPES.map((type) => <SortOptionItem key={type} type={type} sortType={sortType} onSortTypeChange={onSortTypeChange}/>);

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => handleSortingClick()}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortingPopupView && 'places__options--opened'}`}>
        {sortOptionItems}
      </ul>
    </form>
  );
}

SortingForm.propTypes = {
  onSortTypeChange: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
};

export { SortingForm };
export default React.memo(SortingForm);
