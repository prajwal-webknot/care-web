import {
    SeatSummarySeatsAction,
    SeatSummarySeatsActionTypes,
  } from "../actions/SeatSummarySeatsAction";
  import { createSelector } from "reselect";
  
  export interface SeatSummarySeatsState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
  }
  
  const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
  };
  
  export function SeatSummarySeatsReducer(
    state = initialState,
    action: SeatSummarySeatsAction
  ): SeatSummarySeatsState {
    switch (action.type) {
      case SeatSummarySeatsActionTypes.SEAT_SUMMARY_SEATS_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: false,
          data: undefined,
        };
      case SeatSummarySeatsActionTypes.SEAT_SUMMARY_SEATS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: false,
          data: action.data,
        };
      case SeatSummarySeatsActionTypes.SEAT_SUMMARY_SEATS_ERROR:
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
  
  const seatSummarySeatsSelector = (store: { seatSummarySeats: SeatSummarySeatsState }) =>
    store.seatSummarySeats;
  export const seatSummarySeatsResponse = createSelector(
    seatSummarySeatsSelector,
    (state) => state.data
  );
  export const seatSummarySeatsFetching = createSelector(
    seatSummarySeatsSelector,
    (state) => state.isFetching
  );
  