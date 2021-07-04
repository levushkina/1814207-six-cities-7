import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AuthorizationStatus, AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { logout } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';


function AuthLink({status, onLogoutClick}) {
  if (status === AuthorizationStatus.AUTH) {
    return (
      <a
        className="header__nav-link"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          onLogoutClick();
        }}
      >
        <span className="header__signout">Sign out</span>
      </a>
    );
  }

  return (
    <Link to={AppRoute.SIGN_IN} className="header__nav-link" href="#">
      <span className="header__signout">Sign In</span>
    </Link>
  );
}

AuthLink.propTypes = {
  status: PropTypes.string.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  status: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick() {
    dispatch(logout());
  },
});

export {AuthLink};
export default connect(mapStateToProps, mapDispatchToProps)(AuthLink);
