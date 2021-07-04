import { combineReducers } from 'redux';
import { reviews } from './reviews/reviews';
import { offers } from './offers/offers';
import { user } from './user/user';


export const NameSpace = {
  OFFER: 'OFFER',
  REVIEW: 'REVIEW',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.REVIEW]: reviews,
  [NameSpace.OFFER]: offers,
  [NameSpace.USER]: user,
});
