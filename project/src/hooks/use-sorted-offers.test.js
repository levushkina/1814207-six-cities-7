import { renderHook, act } from '@testing-library/react-hooks';
import { useSortedOffers } from './use-sorted-offers';
import { DEFAULT_CITY, sortOption } from '../const';
import { mockOffers } from '../mock/test-mocks';



describe('Hook: useSordedOffers', () => {
  it('should return array with 5 elements', () => {
    const {result} = renderHook(() => useSortedOffers(mockOffers));

    const [currentCity, handleCurrentCityChange, sortType, handleSortTypeChange, sortedOffers] = result.current;

    expect(result.current).toHaveLength(5);
    expect(typeof currentCity).toBe('string')
    expect(handleCurrentCityChange).toBeInstanceOf(Function);
    expect(typeof sortType).toBe('string')
    expect(handleSortTypeChange).toBeInstanceOf(Function);
    expect(sortedOffers).toBeInstanceOf(Array);
  });

  it('should be correctly change currentCity state', () => {
    const {result} = renderHook(() => useSortedOffers(mockOffers));

    const [initialCity] = result.current;
    let [, handleCurrentCityChange] = result.current;

    act(() => handleCurrentCityChange('Amsterdam'));

    const [city] = result.current;
    expect(initialCity).toBe(DEFAULT_CITY);
    expect(city).toBe('Amsterdam');
  });

  it('should be correctly change sortType state', () => {
    const {result} = renderHook(() => useSortedOffers(mockOffers));

    const [, , initialSortType] = result.current;
    let [, , , handleSortTypeChange] = result.current;

    act(() => handleSortTypeChange(sortOption.PRICE_LOW));

    const [, , sortType] = result.current;
    expect(initialSortType).toBe(sortOption.DEFAULT);
    expect(sortType).toBe(sortOption.PRICE_LOW);
  });
});
