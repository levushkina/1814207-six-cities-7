import {createReducer} from '@reduxjs/toolkit';
import { loadReviews, fetchReviewsError, addReview, changeReviewSendingStatus, showReviewPostError, clearReviewError } from '../action';
import { convertSnekeToCamelCase } from '../../utils';


const initialState = {
  reviews: [],
  reviewsIsLoaded: false,
  reviewIsSending: false,
  reviewError: '',
};

const reviews = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = convertSnekeToCamelCase(action.payload);
      state.reviewsIsLoaded = true;
    })
    .addCase(fetchReviewsError, (state, action) => {
      state.reviews = [];
      state.reviewsIsLoaded = false;
    })
    .addCase(addReview, (state, action) => {
      state.reviews = convertSnekeToCamelCase(action.payload);
    })
    .addCase(changeReviewSendingStatus, (state, action) => {
      state.reviewIsSending = action.payload;
    })
    .addCase(showReviewPostError, (state, action) => {
      state.reviewError = action.payload;
    })
    .addCase(clearReviewError, (state, action) => {
      state.reviewError = '';
    });
});

export { reviews };
