import { useState, useCallback } from 'react';
import { formValidate } from '../utils';


export const useReviewsForm = (reviewIsSending, reviewError) => {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleRatingChange = useCallback((value) => {
    setReviewRating(value);
    setEnableSubmit(formValidate(reviewRating, reviewText));
  }, [reviewRating, reviewIsSending]);

  const handleReviewChange = (value) => {
    setReviewText(value);
    setEnableSubmit(formValidate(reviewRating, reviewText));
  };

  const onFormSubmit = () => {
    if (reviewError) { return; }
    setReviewRating(0);
    setReviewText('');
  };

  return [enableSubmit, handleRatingChange, handleReviewChange, onFormSubmit, reviewRating, reviewText];
};
