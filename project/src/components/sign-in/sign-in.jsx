import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/api-actions';
import Header from '../header/header';
import { AuthorizationStatus, AppRoute } from '../../const';
import { getAuthorizationStatus } from '../../store/user/selectors';


function SignIn() {
  const status = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const loginRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (authData) => {
    dispatch(login(authData));
  };

  if (status === AuthorizationStatus.AUTH) {
    return (
      <Redirect to={AppRoute.MAIN} />
    );
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required=""
                  data-testid="login"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required=""
                  data-testid="password"
                  pattern="[a-zA-Z0-9]{1,}"
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
