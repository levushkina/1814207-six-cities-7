import { requiredAuthorization, loginError, setUserEmail, closeSession } from '../action';
import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';


const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userEmail: '',
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(loginError, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = '';
    })
    .addCase(requiredAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(closeSession, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = '';
    });
});

export { user };
