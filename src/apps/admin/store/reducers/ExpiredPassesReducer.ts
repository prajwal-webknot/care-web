import { ExpiredPassesAction, ExpiredPassesActionTypes } from '../actions/ExpiredPassesAction';
import { createSelector } from "reselect";

export interface ExpiredPassesState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function ExpiredPassesReducer(state = initialState, action: ExpiredPassesAction): ExpiredPassesState {
  switch (action.type) {
    case ExpiredPassesActionTypes.EXPIRED_PASSES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case ExpiredPassesActionTypes.EXPIRED_PASSES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case ExpiredPassesActionTypes.EXPIRED_PASSES_ERROR:
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

const expectedVisitorSelector = (store: { expiredPasses: ExpiredPassesState; }) => store.expiredPasses;

export const expiredList = createSelector(expectedVisitorSelector, (state) => state.data);
export const expiredListLoading = createSelector(expectedVisitorSelector, (state) => state.isFetching);
