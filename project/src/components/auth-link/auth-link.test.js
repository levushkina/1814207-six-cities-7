import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import AuthLink from './auth-link';
import { AppRoute, AuthorizationStatus } from '../../const';


const mockStore = configureStore({});
let history = null;
let store;

describe('Component: AuthLink', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = mockStore({});
  });

  it('should render correctly if user auth', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <AuthLink />
        </Router>
      </Provider>);

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly if user no auth', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <AuthLink />
        </Router>
      </Provider>);

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('should logout user when user click "Sign out" button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <AuthLink />
        </Router>
      </Provider>);

    userEvent.click(screen.getByText((/Sign out/i)));
    expect(useDispatch).toBeCalledTimes(1);
  });

  it('should redirect to "/login" when user click "Sign In" button', () => {
    history.push(AppRoute.MAIN);
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.MAIN}>
            <AuthLink />
          </Route>
          <Route exact path={AppRoute.SIGN_IN}>
            <h1>This is SignIn page</h1>
          </Route>
        </Router>
      </Provider>);

    userEvent.click(screen.getByText((/Sign In/i)));
    expect(screen.getByText(/This is SignIn page/i)).toBeInTheDocument();
  });
});
