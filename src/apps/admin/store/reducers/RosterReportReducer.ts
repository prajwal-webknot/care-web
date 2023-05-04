import {
  RosterReportAction,
  RosterReportActionTypes,
} from "../actions/RosterReportAction";
import { createSelector } from "reselect";

export interface RosterReportState {
  isFetching: boolean;
  error: boolean | object;
  data: object | undefined;
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function RosterReportReducer(
  state = initialState,
  action: RosterReportAction
): RosterReportState {
  switch (action.type) {
    case RosterReportActionTypes.ROSTER_REPORT_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case RosterReportActionTypes.ROSTER_REPORT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case RosterReportActionTypes.ROSTER_REPORT_ERROR:
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

const rosterReportSelector = (store: { rosterReport: RosterReportState }) =>
  store.rosterReport;
export const rosterReportResponse = createSelector(
  rosterReportSelector,
  (state) => state.data
);
export const rosterReportFetching = createSelector(
  rosterReportSelector,
  (state) => state.isFetching
);
