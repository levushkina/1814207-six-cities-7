export const mockOffers = [
  {
    bedrooms: 3,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Washing machine', 'Air conditioning'],
    host: {
      id: 3,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    id: 1,
    images: [
      'https://7.react.pages.academy/static/hotel/20.jpg',
      'https://7.react.pages.academy/static/hotel/15.jpg',
    ],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'https://7.react.pages.academy/static/hotel/14.jpg',
    price: 120,
    rating: 4.8,
    type: 'apartment',
    title: 'Beautiful & luxurious studio at great location',
  },
  {
    bedrooms: 3,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Washing machine', 'Air conditioning'],
    host: {
      id: 3,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    id: 2,
    images: [
      'https://7.react.pages.academy/static/hotel/20.jpg',
      'https://7.react.pages.academy/static/hotel/15.jpg',
    ],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'https://7.react.pages.academy/static/hotel/14.jpg',
    price: 120,
    rating: 4.8,
    type: 'house',
    title: 'studio at great location',
  }
];

export const mockReviews = [
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
  },
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
  }
];
