import { createSelector } from 'reselect';
import { NewRegistrationsAction, NewRegistrationsActionTypes } from '../actions/NewRegistrationsAction';

export interface NewRegistrationsState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function NewRegistrationsReducer(state = initialState, action: NewRegistrationsAction): NewRegistrationsState {
  switch (action.type) {
    case NewRegistrationsActionTypes.NEW_REGISTRATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case NewRegistrationsActionTypes.NEW_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case NewRegistrationsActionTypes.NEW_REGISTRATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
    default:
      return state;
  }
}

const NewRegistrationsSelector = (store: { registrations: NewRegistrationsState; }) => store.registrations;
export const NewRegistrationsSelect = createSelector(NewRegistrationsSelector, (state) => state.data);
export const newRegistrationsLoading = createSelector(NewRegistrationsSelector, (state) => state.isFetching);
