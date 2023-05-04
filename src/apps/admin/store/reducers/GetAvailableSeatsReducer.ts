import {
    HotDeskingAction,
    HotDeskingActionTypes,
  } from "../actions/HotDeskingActions";
  import { createSelector } from "reselect";
  
  export interface AvailableSeatsState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
  }
  
  const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
  };
  
  export function GetAvailableSeatsReducer(
    state = initialState,
    action: HotDeskingAction
  ): AvailableSeatsState {
    switch (action.type) {
      case HotDeskingActionTypes.GET_AVAILABLE_SEATS_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: false,
          data: undefined,
        };
      case HotDeskingActionTypes.GET_AVAILABLE_SEATS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: false,
          data: action.data,
        };
      case HotDeskingActionTypes.GET_AVAILABLE_SEATS_ERROR:
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
  
  const availableSeatsSelector = (store: { availableSeats: AvailableSeatsState }) =>
    store.availableSeats;
  export const availableSeatsResponse = createSelector(
    availableSeatsSelector,
    (state) => state.data
  );
  export const availableSeatsFetching = createSelector(
    availableSeatsSelector,
    (state) => state.isFetching
  );
export const availableSeatsError = createSelector(
    availableSeatsSelector,
    (state) => state.error
);