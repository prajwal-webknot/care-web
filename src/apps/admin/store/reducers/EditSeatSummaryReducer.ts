import {
  SeatSummarySeatsActionTypes,
  SeatSummarySeatsAction,
} from "../actions/SeatSummarySeatsAction";
import { createSelector } from "reselect";

export interface EditSeatSummaryState {
  isFetching: boolean;
  error: boolean | object;
  data: object | undefined;
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function EditSeatSummaryReducer(
  state = initialState,
  action: SeatSummarySeatsAction | SeatSummarySeatsAction
): EditSeatSummaryState {
  switch (action.type) {
    case SeatSummarySeatsActionTypes.PATCH_SEAT_SUMMARY_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case SeatSummarySeatsActionTypes.PATCH_SEAT_SUMMARY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case SeatSummarySeatsActionTypes.PATCH_SEAT_SUMMARY_ERROR:
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

const editSeatSummarySelector = (store: {
  editSeatSummary: EditSeatSummaryState;
}) => store.editSeatSummary;

export const editSeatSummary = createSelector(
  editSeatSummarySelector,
  (state) => state.data
);
export const editSeatSummaryFull = createSelector(
  editSeatSummarySelector,
  (state) => state
);
