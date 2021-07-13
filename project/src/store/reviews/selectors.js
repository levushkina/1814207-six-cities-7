import { NameSpace } from '../root-reducer';


export const getReviews = (state) => state[NameSpace.REVIEW].reviews;
export const getReviewsIsLoaded = (state) => state[NameSpace.REVIEW].reviewsIsLoaded;
export const getReviewIsSending = (state) => state[NameSpace.REVIEW].reviewIsSending;
export const getReviewError = (state) => state[NameSpace.REVIEW].reviewError;
