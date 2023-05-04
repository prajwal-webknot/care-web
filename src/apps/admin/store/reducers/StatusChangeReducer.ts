import {
  StatusChangeActionTypes,
  StatusChangeAction
} from '../actions/StatusChangeAction';
import { createSelector } from "reselect";

export interface StatusChangeState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function StatusChangeReducer(state = initialState, action: StatusChangeAction | StatusChangeAction): StatusChangeState {
  switch (action.type) {
    case StatusChangeActionTypes.STATUS_CHANGE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case StatusChangeActionTypes.STATUS_CHANGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case StatusChangeActionTypes.STATUS_CHANGE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
      case StatusChangeActionTypes.STATUS_CHANGE_TEMP_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case StatusChangeActionTypes.STATUS_CHANGE_TEMP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case StatusChangeActionTypes.STATUS_CHANGE_TEMP_ERROR:
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

const premiseHeadCountSelector = (store: { statusChange: StatusChangeState; }) => store.statusChange;

export const statusChange = createSelector(premiseHeadCountSelector, (state) => state.data);
export const statusChangeFull = createSelector(premiseHeadCountSelector, (state) => state);
