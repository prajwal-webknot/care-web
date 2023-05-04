import { createSelector } from 'reselect';
import { LocationAction, LocationActionTypes } from './LocationActions';

export interface LocationState {
  isFetching: boolean,
  error: boolean | object,
  data: any,
}

export enum LOCATION_STATUS {
  PENDING,
  SUCCESS,
  FAIL,
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function LocationReducer(state = initialState, action: LocationAction): LocationState {
  switch (action.type) {
    case LocationActionTypes.LOCATION_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case LocationActionTypes.LOCATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case LocationActionTypes.LOCATION_ERROR:
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
const locationsSelector = (store: { locations: LocationState; }) => store.locations;

export const locationsList = createSelector(locationsSelector, (state) => state.data);
