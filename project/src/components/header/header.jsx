import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthLink from '../auth-link/auth-link';
import ProfileLink from '../profile-link/profile-link';

function Header({authorizationStatus, userEmail}) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {userEmail && <ProfileLink userEmail={userEmail}/> }
              </li>
              <li className="header__nav-item">
                <AuthLink/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  userEmail: state.userEmail,
});

export {Header};
export default connect(mapStateToProps)(Header);
