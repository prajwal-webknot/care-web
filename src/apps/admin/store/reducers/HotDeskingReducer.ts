import {
    HotDeskingAction,
    HotDeskingActionTypes,
  } from "../actions/HotDeskingActions";
  import { createSelector } from "reselect";
  
  export interface HotDeskingState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
  }
  
  const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
  };
  
  export function HotDeskingReducer(
    state = initialState,
    action: HotDeskingAction
  ): HotDeskingState {
    switch (action.type) {
      case HotDeskingActionTypes.HOT_DESKING_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: false,
          data: undefined,
        };
      case HotDeskingActionTypes.HOT_DESKING_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: false,
          data: action.data,
        };
      case HotDeskingActionTypes.HOT_DESKING_ERROR:
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
  
  const hotDeskingSelector = (store: { hotDesking: HotDeskingState }) =>
    store.hotDesking;
  export const hotDeskingResponse = createSelector(
    hotDeskingSelector,
    (state) => state.data
  );
  export const hotDeskingFetching = createSelector(
    hotDeskingSelector,
    (state) => state.isFetching
  );