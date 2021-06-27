export const ActionType = {
  CHANGE_CITY: 'chengeSity',
  CHANGE_SORT_TYPE: 'changeSortType',
  LOAD_OFFERS: 'loadOffers',
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
};
