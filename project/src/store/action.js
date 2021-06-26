export const ActionType = {
  CHANGE_CITY: 'chengeSity',
  CHANGE_SORT_TYPE: 'changeSortType',
  CHANGE_ACTIVE_CARD: 'changeActiveCard',
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
  changeActiveCard: (id) => ({
    type: ActionType.CHANGE_ACTIVE_CARD,
    payload: id,
  }),
};
