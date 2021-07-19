import { renderHook, act } from '@testing-library/react-hooks';
import {render, screen} from '@testing-library/react';
import { useMapMarkers } from './use-map-markers';
import { mockOffers } from '../mock/test-mocks';
import * as React from 'react';


const mockMap = jest.mock('leaflet', () => ({
  __esModule: true,
  default: {
    icon() {
      return 'icon src';
    },
    map() {
      return 'mock map';
    },
    tileLayer() {
      return this;
    },
    addTo() {
      return this;
    },
  },
}));

describe('Hook useMapMarkers', () => {
  it('should return map', () => {
    mockMap.addLayer = jest.fn();
    mockMap.removeLayer = jest.fn();
    const {result} = renderHook(() =>
      useMapMarkers(mockMap, mockOffers, 1),
    );
    expect(mockMap.addLayer).toHaveBeenCalledTimes(mockOffers.length);
  });
});
