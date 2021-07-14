import React from 'react';
import { render , screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import SignIn from './sign-in';
import { AppRoute, AuthorizationStatus } from '../../const';

const mockStore = configureStore({});

describe('Component: SignIn', () => {
  let store = mockStore({USER: {userEmail: ''}});
  const history = createMemoryHistory();

  it('should render SignIn when user navigate to "login" url', () => {

    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn/>
        </Router>
      </Provider>,
    );
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), '12345');

    expect(screen.getByDisplayValue('test@mail.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
  });

  it('onSubmit should called when user submit form', () => {
    history.push('/login');
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn/>
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('login'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), '12345');
    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalled();
  });

  it('should redirect to "/" when user auth', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH, userEmail: 'test@mail.ru'},
      dispatch: jest.fn(),
    });
    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.MAIN}>
            <h1>This is Main page</h1>
          </Route>
          <SignIn/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });
});
