import {
  SeatSummaryAction,
  SeatSummaryActionTypes,
} from "../actions/SeatSummaryAction";
import { createSelector } from "reselect";

export interface SeatSummaryState {
  isFetching: boolean;
  error: boolean | object;
  data: object | undefined;
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function SeatSummaryReducer(
  state = initialState,
  action: SeatSummaryAction
): SeatSummaryState {
  switch (action.type) {
    case SeatSummaryActionTypes.SEAT_SUMMARY_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case SeatSummaryActionTypes.SEAT_SUMMARY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case SeatSummaryActionTypes.SEAT_SUMMARY_ERROR:
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

const seatSummarySelector = (store: { seatSummary: SeatSummaryState }) =>
  store.seatSummary;
export const seatSummaryResponse = createSelector(
  seatSummarySelector,
  (state) => state.data
);
export const seatSummaryFetching = createSelector(
  seatSummarySelector,
  (state) => state.isFetching
);
