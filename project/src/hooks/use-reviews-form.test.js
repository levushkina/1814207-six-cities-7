import { renderHook, act } from '@testing-library/react-hooks';
import { useReviewsForm } from './use-reviews-form';


describe('Hook: useReviewsForm', () => {
  it('should return array with 6 elements', () => {
    const {result} = renderHook(() => useReviewsForm(false, '', 1));

    const [enableSubmit, handleRatingChange, handleReviewChange, handleFormSubmit, reviewRating, reviewText] = result.current;

    expect(result.current).toHaveLength(6);
    expect(typeof enableSubmit).toBe('boolean')
    expect(handleRatingChange).toBeInstanceOf(Function);
    expect(handleReviewChange).toBeInstanceOf(Function);
    expect(handleFormSubmit).toBeInstanceOf(Function);
    expect(typeof reviewRating).toBe('number')
    expect(typeof reviewText).toBe('string')
  });

  it('should be correctly change reviewText state', () => {
    const {result} = renderHook(() => useReviewsForm(false));
    const [, , , , , initialText] = result.current;
    let [, , handleReviewChange] = result.current;

    expect(initialText).toBe('');
    act(() => handleReviewChange('Amsterdam'));
    const [, , , , , newText] = result.current;
    expect(newText).toBe('Amsterdam');
  });

  it('should be correctly change reviewRating state', () => {
    const {result} = renderHook(() => useReviewsForm(false));
    const [, , , , initialRating] = result.current;
    let [, handleRatingChange] = result.current;

    expect(initialRating).toBe(0);
    act(() => handleRatingChange(4));
    const [, , , , newRating] = result.current;
    expect(newRating).toBe(4);
  });

  it('should be correctly change state on form submit', () => {
    const {result} = renderHook(() => useReviewsForm(false));
    const [, handleRatingChange, handleReviewChange, onFormSubmit, initialRating, initialText] = result.current;

    act(() => handleRatingChange(4));
    act(() => handleReviewChange('Amsterdam'));
    const [, , , , changedRating, changedText] = result.current;

    expect(changedRating).toBe(4);
    expect(changedText).toBe('Amsterdam');

    act(() => onFormSubmit());

    const [, , , , clearedRating, clearedText] = result.current;
    expect(clearedRating).toBe(0);
    expect(clearedText).toBe('');
  });
});
