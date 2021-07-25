import { reviews } from './reviews';
import { ActionType } from '../action';
import { ReviewsPostError } from '../../const';

const mockReviews = [{
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  date: '2019-05-08T14:13:56.569Z',
  id: 1,
  rating: 4,
  user: {
    avatarUrl: 'img/1.png',
    id: 4,
    isPro: false,
    name: 'Max',
  },
}];

describe('Reducer: reviews', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviews(undefined, {}))
      .toEqual({
        reviews: [],
        reviewsIsLoaded: false,
        reviewIsSending: false,
        reviewError: '',
      });
  });

  it('should update reviews & reviewsIsLoaded when reviews loaded', () => {
    const state = {
      reviews: [],
      reviewsIsLoaded: false,
    };
    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: mockReviews,
    };

    expect(reviews(state, loadReviewsAction))
      .toEqual({
        reviews: mockReviews,
        reviewsIsLoaded: true,
      });
  });

  it('should reset reviews & reviewsIsLoaded when error', () => {
    const state = {
      reviews: [],
      reviewsIsLoaded: false,
    };
    const fetchReviewsErrorAction = {
      type: ActionType.FETCH_REVIEWS_ERROR,
      payload: mockReviews,
    };

    expect(reviews(state, fetchReviewsErrorAction))
      .toEqual({
        reviews: [],
        reviewsIsLoaded: false,
      });
  });

  it('should update reviews when review added', () => {
    const state = {reviews: []};
    const addReviewAction = {
      type: ActionType.ADD_REVIEW,
      payload: mockReviews,
    };

    expect(reviews(state, addReviewAction))
      .toEqual({
        reviews: mockReviews,
        reviewError: '',
      });
  });

  it('should update reviewError', () => {
    const state = {reviewError: ''};
    const showReviewPostErrorAction = {
      type: ActionType.SHOW_REVIEW_POST_ERROR,
      payload: ReviewsPostError.COMMON_ERROR,
    };

    expect(reviews(state, showReviewPostErrorAction))
      .toEqual({reviewError: ReviewsPostError.COMMON_ERROR});
  });

  it('should update reviewIsSending when new review sending', () => {
    const state = {
      reviewIsSending: false,
    };
    const changeReviewSendingStatusAction = {
      type: ActionType.CHANGE_REVIEW_SENDING_STATUS,
      payload: true,
    };

    expect(reviews(state, changeReviewSendingStatusAction))
      .toEqual({
        reviewIsSending: true,
      });
  });
});
