import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import ReviewsForm from './reviews-form';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import { ActionType } from '../../store/action';
import * as Form from '../../hooks/use-reviews-form';


const mockStore = configureStore({});
let history = null;
let store = mockStore({});

describe('Component: ReviewsForm', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should correct render ReviewsForm', () => {
    store = mockStore({
      REVIEW: {reviewIsSending: false, reviewError: ''},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsForm offerId='1'/>
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });

  it('should render reviewError if it exist', () => {
    store = mockStore({
      REVIEW: {reviewIsSending: false, reviewError: 'error text'},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsForm offerId='1'/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/error text/i)).toBeInTheDocument();
  });

  it('should render disabled fields when reviewIsSending', () => {
    store = mockStore({
      REVIEW: {reviewIsSending: true, reviewError: ''},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsForm offerId='1'/>
        </Router>
      </Provider>,
    );

    const checboxes = screen.getAllByTestId('rating-checkbox');

    expect(screen.getByTestId('rating-textarea')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    checboxes.forEach((checkbox) => expect(checkbox).toBeDisabled());
  });

  it('should enabled button when not reviewIsSending & enableSubmit', () => {
    store = mockStore({
      REVIEW: {reviewIsSending: false, reviewError: ''},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const useReviewsForm = jest.spyOn(Form, 'useReviewsForm').mockImplementation(() => [true, jest.fn(), jest.fn(), jest.fn(), 0, 'text']);
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsForm offerId='1'/>
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByTestId('rating-textarea')).toHaveValue('text');
  });

  it('should called handleReviewChange when user type comment', () => {
    store = mockStore({
      REVIEW: {reviewIsSending: false, reviewError: ''},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const handleReviewChange = jest.fn();
    const useReviewsForm = jest.spyOn(Form, 'useReviewsForm').mockImplementation(() => [true, jest.fn(), handleReviewChange, jest.fn(), 0, '']);
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsForm offerId='1'/>
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('rating-textarea'), 'text');
    expect(handleReviewChange).toBeCalled();
    expect(handleReviewChange).nthCalledWith(1, 't');
    expect(handleReviewChange).nthCalledWith(2, 'e');
    expect(handleReviewChange).nthCalledWith(3, 'x');
    expect(handleReviewChange).nthCalledWith(4, 't');
  });

  it('should called onFormSubmit when user send form', () => {
    store = mockStore({
      REVIEW: {reviewIsSending: false, reviewError: ''},
      dispatch: jest.fn(),
    });
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const onFormSubmit = jest.fn();
    const useReviewsForm = jest.spyOn(Form, 'useReviewsForm').mockImplementation(() => [true, jest.fn(), jest.fn(), onFormSubmit, 0, '']);
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsForm offerId='1'/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(onFormSubmit).toBeCalled();
    expect(dispatch).toBeCalled();
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.CHANGE_REVIEW_SENDING_STATUS,
      payload: true,
    });
  });
});
