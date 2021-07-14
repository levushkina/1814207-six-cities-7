import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Map from './map';
import { mockOffers } from '../../mock/test-mocks';
import * as useMap from '../../hooks/use-map';


const mockStore = configureStore({});
let history = null;
let store = mockStore({});

describe('Component: Map', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = mockStore({
      OFFER: {offers: mockOffers, offersIsLoaded: true},
      dispatch: jest.fn(),
    });
  });

  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Map places={mockOffers} activeCardId={1}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
    expect(container.querySelector('.leaflet-container')).toBeInTheDocument();
    expect(container.querySelector('.leaflet-marker-icon')).toBeInTheDocument();
  });

  it('should render correctly current position', () => {
    const map = jest.fn();
    const useMapSpy = jest.spyOn(useMap, 'useMap');
    const currentLocation = mockOffers[0].city.location;
    map.setView = jest.fn();
    map.addLayer = jest.fn();
    useMapSpy.mockReturnValue(map);

    const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <Map places={mockOffers} activeCardId={1}/>
        </Router>
      </Provider>,
    );

    expect(map.setView).toBeCalled();
    expect(map.setView).nthCalledWith(1, [currentLocation.latitude, currentLocation.longitude]);
  });
});
