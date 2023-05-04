import { ExpectedVisitorsAction, ExpectedVisitorsActionTypes } from '../actions/ExpectedVisitorsAction';
import { createSelector } from "reselect";

export interface ExpectedVisitorsState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function ExpectedVisitorsReducer(state = initialState, action: ExpectedVisitorsAction): ExpectedVisitorsState {
  switch (action.type) {
    case ExpectedVisitorsActionTypes.EXPECTED_VISITORS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case ExpectedVisitorsActionTypes.EXPECTED_VISITORS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case ExpectedVisitorsActionTypes.EXPECTED_VISITORS_ERROR:
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
const expectedVisitorSelector = (store: { expectedVisitor: ExpectedVisitorsState; }) => store.expectedVisitor;

export const expectedVisitorList = createSelector(expectedVisitorSelector, (state) => state.data);
export const expectedVisitorLoading = createSelector(expectedVisitorSelector, (state) => state.isFetching);
