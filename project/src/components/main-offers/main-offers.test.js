import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';
import MainOffers from './main-offers';
import { mockOffers } from '../../mock/test-mocks';
import { sortOption } from '../../const';


const mockStore = configureStore({});
let history = null;
let store = mockStore({});

describe('Component: MainOffers', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should correct render MainOffers', () => {
    store = mockStore({
      USER: {userEmail: ''},
      OFFER: {offers: mockOffers, offersIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainOffers
            offers={mockOffers}
            currentCity='Paris'
            onSortTypeChange={jest.fn()}
            sortType={sortOption.PRICE_LOW}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
    mockOffers.forEach((offer) => expect(screen.getByText(offer.title)).toBeInTheDocument());
    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
  });
});
