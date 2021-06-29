export const ActionType = {
  CHANGE_CITY: 'chengeSity',
  GET_OFFERS_BY_CITY: 'getOffersByCity',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffersByCity: (city) => ({
    type: ActionType.GET_OFFERS_BY_CITY,
    payload: city,
  }),
};
