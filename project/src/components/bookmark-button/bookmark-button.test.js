import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import BookmarkButton from './bookmark-button';
import { BookmarkClass } from '../../const';
import { addToFavorites } from '../../store/api-actions';


const mockStore = configureStore({});
let history = null;
let store;

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

  it('should addToFavorites when user click unactive "To bookmarks" button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    store = mockStore({
      OFFER: {favorites: []},
    });

    const {rerender} = render(
      <Provider store={mockStore({})}>
        <BookmarkButton offerId={1} isActive={false} className={BookmarkClass.OFFER_LIST}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
        </BookmarkButton>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
    expect(screen.getByRole('button')).not.toHaveClass(`${BookmarkClass.OFFER_LIST}__bookmark-button--active`);

    rerender(
      <Provider store={mockStore({})}>
        <BookmarkButton offerId={1} isActive={true} className={BookmarkClass.OFFER_LIST}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
        </BookmarkButton>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveClass(`${BookmarkClass.OFFER_LIST}__bookmark-button--active`);
  });

  it('should remove from Favorites when user click active "To bookmarks" button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    store = mockStore({
      OFFER: {favorites: []},
    });

    const {rerender} = render(
      <Provider store={mockStore({})}>
        <BookmarkButton offerId={1} isActive={true} className={BookmarkClass.OFFER_LIST}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
        </BookmarkButton>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
    expect(screen.getByRole('button')).toHaveClass(`${BookmarkClass.OFFER_LIST}__bookmark-button--active`);

    rerender(
      <Provider store={mockStore({})}>
        <BookmarkButton offerId={1} isActive={false} className={BookmarkClass.OFFER_LIST}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
        </BookmarkButton>
      </Provider>,
    );

    expect(screen.getByRole('button')).not.toHaveClass(`${BookmarkClass.OFFER_LIST}__bookmark-button--active`);
  });
});
