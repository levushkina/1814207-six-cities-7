import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppRoute } from '../../const';


function ProfileLink({userEmail}) {
  return (
    <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{userEmail}</span>
    </Link>
  );
}

ProfileLink.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default ProfileLink;
