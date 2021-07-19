import { sortOption, AuthorizationStatus } from './const';
import {
  convertRatingToPercent,
  convertSnekeToCamelCase,
  sortPlacesByCity,
  convertDate,
  filterOfferByCity,
  sortOffers,
  isCheckedAuth,
  getOffersByIds,
  formValidate,
  sortReviewsByDate
} from './utils';
import { mockReviews } from './mock/test-mocks';

describe('Function: convertRatingToPercen', () => {
  it('should return percent rating for round rating value', () => {
    expect(convertRatingToPercent(4)).toBe('80%');
    expect(convertRatingToPercent(4.5)).toBe('100%');
  });
});

describe('Function: convertSnekeToCamelCase', () => {
  it('should return camelCase', () => {
    const fakeData = {
      image_url: 'test',
      is_favorite: true,
      max_adults: 4,
      host: {
        avatar_url: 'test',
      },
    };
    const expectResult = {
      imageUrl: 'test',
      isFavorite: true,
      maxAdults: 4,
      host: {
        avatarUrl: 'test',
      },
    };
    expect(convertSnekeToCamelCase(fakeData)).toStrictEqual(expectResult);
  });
});

describe('Function: sortPlacesByCity', () => {
  it('should return places grouped by city', () => {
    const fakeData = [
      {id: 1, city: {name: 'Amsterdam'}},
      {id: 2, city: {name: 'Paris'}},
      {id: 3, city: {name: 'Hamburg'}},
      {id: 4, city: {name: 'Paris'}},
      {id: 5, city: {name: 'Amsterdam'}}
    ];
    const expectResult = {
      'Amsterdam': [
        {id: 1, city: {name: 'Amsterdam'}},
        {id: 5, city: {name: 'Amsterdam'}}
      ],
      'Paris': [
        {id: 2, city: {name: 'Paris'}},
        {id: 4, city: {name: 'Paris'}},
      ],
      'Hamburg': [
        {id: 3, city: {name: 'Hamburg'}}
      ]
    };
    expect(sortPlacesByCity(fakeData)).toStrictEqual(expectResult);
  });
});

describe('Function: convertDate', () => {
  it('should return converted date', () => {
    const fakeData = '2019-05-08T14:13:56.569Z';
    const expectResult = 'May 2019';
    expect(convertDate(fakeData)).toBe(expectResult);
  });
});

describe('Function: filterOfferByCity', () => {
  it('should return offers by single city', () => {
    const fakeData = [
      {id: 1, city: {name: 'Amsterdam'}},
      {id: 2, city: {name: 'Paris'}},
      {id: 3, city: {name: 'Hamburg'}},
      {id: 4, city: {name: 'Paris'}},
      {id: 5, city: {name: 'Amsterdam'}}
    ];
    const expectResult =[
      {id: 1, city: {name: 'Amsterdam'}},
      {id: 5, city: {name: 'Amsterdam'}}
    ];
    expect(filterOfferByCity('Amsterdam', fakeData)).toStrictEqual(expectResult);
  });

  describe('Function: sortOffers', () => {
    let fakeData;
    beforeAll(() => {
      fakeData = [
        {id: 1, price: 150, rating: 4.5},
        {id: 2, price: 230, rating: 5},
        {id: 3, price: 99, rating: 3.2},
        {id: 4, price: 80, rating: 4},
        {id: 5, price: 185, rating: 2.5}
      ];
    });

    it('should return offers sorted by price low to high', () => {
      const expectResult = [
        {id: 4, price: 80, rating: 4},
        {id: 3, price: 99, rating: 3.2},
        {id: 1, price: 150, rating: 4.5},
        {id: 5, price: 185, rating: 2.5},
        {id: 2, price: 230, rating: 5}
      ];
      expect(sortOffers(sortOption.PRICE_LOW, fakeData)).toStrictEqual(expectResult);
    });

    it('should return offers sorted by price high to low', () => {
      const expectResult = [
        {id: 2, price: 230, rating: 5},
        {id: 5, price: 185, rating: 2.5},
        {id: 1, price: 150, rating: 4.5},
        {id: 3, price: 99, rating: 3.2},
        {id: 4, price: 80, rating: 4}
      ];
      expect(sortOffers(sortOption.PRICE_HIGH, fakeData)).toStrictEqual(expectResult);
    });

    it('should return offers sorted by rating', () => {
      const expectResult = [
        {id: 2, price: 230, rating: 5},
        {id: 1, price: 150, rating: 4.5},
        {id: 4, price: 80, rating: 4},
        {id: 3, price: 99, rating: 3.2},
        {id: 5, price: 185, rating: 2.5}
      ];
      expect(sortOffers(sortOption.RATING, fakeData)).toStrictEqual(expectResult);
    });

    it('should return offers sorted by default', () => {
      const expectResult = [
        {id: 1, price: 150, rating: 4.5},
        {id: 2, price: 230, rating: 5},
        {id: 3, price: 99, rating: 3.2},
        {id: 4, price: 80, rating: 4},
        {id: 5, price: 185, rating: 2.5}
      ];
      expect(sortOffers(sortOption.DEFAULT, fakeData)).toStrictEqual(expectResult);
    });
  });

  describe('Function: isCheckedAuth', () => {
    it('should return correct isCheckedAuth', () => {
      expect(isCheckedAuth(AuthorizationStatus.AUTH)).toBe(false);
      expect(isCheckedAuth(AuthorizationStatus.NO_AUTH)).toBe(false);
      expect(isCheckedAuth(AuthorizationStatus.UNKNOWN)).toBe(true);
    });
  });

  describe('Function: getOffersByIds', () => {
    it('should return filtered by ids', () => {
      const fakeData = [
        {id: 1, city: {name: 'Amsterdam'}},
        {id: 2, city: {name: 'Paris'}},
        {id: 3, city: {name: 'Hamburg'}},
        {id: 4, city: {name: 'Paris'}},
        {id: 5, city: {name: 'Amsterdam'}}
      ];
      const expectResult = [
        {id: 1, city: {name: 'Amsterdam'}},
        {id: 4, city: {name: 'Paris'}},
        {id: 5, city: {name: 'Amsterdam'}}
      ];
      expect(getOffersByIds(fakeData, [1, 4, 5])).toStrictEqual(expectResult);
    });
  });

  describe('Function: formValidate', () => {
    it('should return false when reviewText to short', () => {
      expect(formValidate(3, 'short text')).toBe(false);
    });

    it('should return false when reviewRating is 0', () => {
      expect(formValidate(0, 'long text more than 50 characters long text more than 50 characters.')).toBe(false);
    });

    it('should return true when reviewRating & reviewText is valid', () => {
      expect(formValidate(3, 'long text more than 50 characters long text more than 50 characters.')).toBe(true);
    });
  });

  describe('Function: sortReviewsByDate', () => {
    it('should return offers sorted by price low to high', () => {
      const expectResult = [
        {
          comment: 'Comment behind a a river by the unique lightness of Amsterdam.',
          date: '2019-06-08T14:13:56.569Z',
          id: 2,
          rating: 3,
          user: {
            avatarUrl: 'img/1.png',
            id: 4,
            is_pro: false,
            name: 'ANN'
          }
        },
        {
          comment: 'Comment a a river by the unique lightness of Amsterdam.',
          date: '2019-05-08T14:13:56.569Z',
          id: 1,
          rating: 4,
          user: {
            avatarUrl: 'img/1.png',
            id: 4,
            is_pro: false,
            name: 'Max'
          }
        }
      ];
      expect(sortReviewsByDate(mockReviews)).toStrictEqual(expectResult);
    });
  });
});
