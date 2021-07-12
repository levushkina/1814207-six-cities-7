import React from 'react';
import { render , screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignIn from './sign-in';


const mockStore = configureStore({});

describe('Component: SignIn', () => {
  const store = mockStore({USER: {userEmail: ''}});

  it('should render SignIn when user navigate to "login" url', () => {
    const history = createMemoryHistory();
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
});
