import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import OffersReviews from './offers-reviews';
import { AuthorizationStatus } from '../../const';
import { mockReviews } from '../../mock/test-mocks';


const mockStore = configureStore({});
let history = null;
let store = mockStore({});

describe('Component: OffersReviews', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should correct render OffersReviews when user auth', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
      REVIEW: {reviews: mockReviews, reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <OffersReviews offerId='1' reviews={mockReviews}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    mockReviews.forEach((review) => expect(screen.getByText(review.comment)).toBeInTheDocument());
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });

  it('should no render reviewsForm when user no auth', () => {
    store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
      REVIEW: {reviews: mockReviews, reviewsIsLoaded: true},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <OffersReviews offerId='1' reviews={mockReviews}/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To submit review please make sure to set/i)).not.toBeInTheDocument();
  });


});
