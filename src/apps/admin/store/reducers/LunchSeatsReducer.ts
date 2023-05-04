import {
  LunchSeatsAction,
  LunchSeatsActionTypes,
} from "../actions/LunchSeatsAction";
import { createSelector } from "reselect";

export interface LunchSeatsState {
  isFetching: boolean;
  error: boolean | object;
  data: object | undefined;
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function LunchSeatsReducer(
  state = initialState,
  action: LunchSeatsAction
): LunchSeatsState {
  switch (action.type) {
    case LunchSeatsActionTypes.LUNCH_SEATS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case LunchSeatsActionTypes.LUNCH_SEATS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case LunchSeatsActionTypes.LUNCH_SEATS_ERROR:
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

const lunchSeatsSelector = (store: { lunchSeats: LunchSeatsState }) =>
  store.lunchSeats;
export const lunchSeatsResponse = createSelector(
  lunchSeatsSelector,
  (state) => state.data
);
export const lunchSeatsFetching = createSelector(
  lunchSeatsSelector,
  (state) => state.isFetching
);
