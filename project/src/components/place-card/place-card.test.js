import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlaceCard from './place-card';
import { mockOffers } from '../../mock/test-mocks';
import userEvent from '@testing-library/user-event';


const history = createMemoryHistory();
const mockStore = configureStore({});

describe('Component: PlaceCard', () => {
  const store = mockStore({});

  it('should render PlaceCard', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard place={mockOffers[0]} onPlaceMouseOver={jest.fn()} type='NEAR'/>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText('Place image')).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();
    expect(screen.getByText('Beautiful & luxurious studio at great location')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
  });

  it('onPlaceMouseOver should called when offer hovered', () => {
    const onPlaceMouseOver = jest.fn();

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard place={mockOffers[0]} onPlaceMouseOver={onPlaceMouseOver} type='NEAR'/>
        </Router>
      </Provider>,
    );

    userEvent.hover(container.querySelector('.place-card'));
    expect(onPlaceMouseOver).toBeCalled();
    expect(onPlaceMouseOver).nthCalledWith(1, 1);
  });

  it('should render premium label if isPremium true', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard place={mockOffers[1]} onPlaceMouseOver={jest.fn()} type='NEAR'/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should no render premium label if isPremium false', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PlaceCard place={mockOffers[0]} onPlaceMouseOver={jest.fn()} type='NEAR'/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });
});
