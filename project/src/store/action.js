export const ActionType = {
  CHANGE_CITY: 'chengeSity',
  CHANGE_SORT_TYPE: 'changeSortType',
  LOAD_OFFERS: 'loadOffers',
  REQUIRED_AUTHORIZATION: 'requiredAuthorization',
  LOGOUT: 'logout',
  SET_USER_EMAIL: 'setUserEmail',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  setUserEmail: (email) => ({
    type: ActionType.SET_USER_EMAIL,
    payload: email,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};
