import React, { useCallback } from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlacesList from './places-list';
import { mockOffers } from '../../mock/test-mocks';
import userEvent from '@testing-library/user-event';


const history = createMemoryHistory();
const mockStore = configureStore({});

describe('Component: PlacesList', () => {
  const store = mockStore({});

  it('should render PlacesList', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlacesList places={mockOffers} setActiveCard={jest.fn()}/>
        </Router>
      </Provider>,
    );

    mockOffers.forEach((offer) => expect(screen.getByText(offer.title)).toBeInTheDocument());
  });

  it('onChange should called when placeCard is hovered', () => {
    const setActiveCard = jest.fn()

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <PlacesList places={mockOffers} setActiveCard={setActiveCard}/>
        </Router>
      </Provider>,
    );
    userEvent.hover(container.querySelector('.place-card'));

    expect(setActiveCard).toBeCalled();
    expect(setActiveCard).nthCalledWith(1, 1);
  });
});
