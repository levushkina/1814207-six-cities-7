import React from 'react';
import PropTypes from 'prop-types';

function ProfileLink({userEmail}) {
  return (
    <a className="header__nav-link header__nav-link--profile" href="#">
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__user-name user__name">{userEmail}</span>
    </a>
  );
}

export default ProfileLink;

ProfileLink.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
