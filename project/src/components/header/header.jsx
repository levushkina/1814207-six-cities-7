import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthLink from '../auth-link/auth-link';
import ProfileLink from '../profile-link/profile-link';
import { getUserEmail } from '../../store/user/selectors';


function Header() {
  const userEmail = useSelector(getUserEmail);

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

export { Header };
export default React.memo(Header);
