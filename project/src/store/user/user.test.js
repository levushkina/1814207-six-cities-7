import { user } from './user';
import { ActionType, requiredAuthorization, loginError, closeSession } from '../action';
import { AuthorizationStatus } from '../../const';


describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user(undefined, {}))
      .toEqual({authorizationStatus: AuthorizationStatus.UNKNOWN, userEmail: ''});
  });

  it('should update authorizationStatus to "AUTH" & update userEmail', () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {
        status: 'AUTH',
        email: 'test@mail.ru',
      },
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: 'test@mail.ru'
      });
  });

  it('should update authorizationStatus to NO_AUTH and clear userEmail', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      userEmail: 'test@mail.ru',
    };

    const closeSessionAction = {
      type: ActionType.LOGOUT,
      payload: AuthorizationStatus.NO_AUTH,
    };

    expect(user(state, closeSessionAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: '',
      });
  });

  it('should update authorizationStatus to NO_AUTH and clear userEmail when login error', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userEmail: '',
    };

    const loginErrorAction = {
      type: ActionType.LOGIN_ERROR,
      payload: AuthorizationStatus.NO_AUTH,
    };

    expect(user(state, loginErrorAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: '',
      });
  });
});
