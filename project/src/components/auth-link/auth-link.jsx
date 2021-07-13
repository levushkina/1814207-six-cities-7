import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthorizationStatus, AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { logout } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';


function AuthLink() {
  const status = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const handleLogoutClick = (evt) => {
    evt.preventDefault();
    dispatch(logout());
  };

  if (status === AuthorizationStatus.AUTH) {
    return (
      <a
        className="header__nav-link"
        href="#"
        onClick={handleLogoutClick}
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

export default AuthLink;
