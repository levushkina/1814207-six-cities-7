import { renderHook, act } from '@testing-library/react-hooks';
import {render, screen} from '@testing-library/react';
import { useMap } from './use-map';


jest.mock('leaflet', () => ({
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

const mockRef = {
  current: '<section className="cities__map map"/>',
};
const mockCity = {
  name: 'Amsterdam',
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

describe('Hook useMap', () => {
  it('should return map', () => {
    const {result} = renderHook(() =>
      useMap(mockRef, mockCity),
    );

    expect(result.current).toBe('mock map');
  });
});
