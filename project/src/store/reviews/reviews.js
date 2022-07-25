import { createReducer } from '@reduxjs/toolkit';
import { loadReviews, fetchReviewsError, addReview, changeReviewSendingStatus, showReviewPostError } from '../action';


const initialState = {
  reviews: [],
  reviewsIsLoaded: false,
  reviewIsSending: false,
  reviewError: '',
};

const reviews = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.reviewsIsLoaded = true;
    })
    .addCase(fetchReviewsError, (state) => {
      state.reviews = [];
      state.reviewsIsLoaded = false;
    })
    .addCase(addReview, (state, action) => {
      state.reviews = action.payload;
      state.reviewError = '';
    })
    .addCase(changeReviewSendingStatus, (state, action) => {
      state.reviewIsSending = action.payload;
    })
    .addCase(showReviewPostError, (state, action) => {
      state.reviewError = action.payload;
    });
});

export { reviews };
