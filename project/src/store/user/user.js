import { requiredAuthorization, loginError, closeSession } from '../action';
import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';


const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userEmail: '',
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(loginError, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = '';
    })
    .addCase(requiredAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.status;
      state.userEmail = action.payload.email;
    })
    .addCase(closeSession, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = '';
    });
});

export { user };
