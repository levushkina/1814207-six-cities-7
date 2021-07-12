import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import BookmarkButton from './bookmark-button';
import { BookmarkClass } from '../../const';


const mockStore = configureStore({});

describe('Component: BookmarkButton', () => {
  it('should render BookmarkButton', () => {
    render(
      <Provider store={mockStore({})}>
        <BookmarkButton offerId={1} isActive={true} className={BookmarkClass.OFFER_LIST}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
        </BookmarkButton>
      </Provider>,
    );

    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });
});
