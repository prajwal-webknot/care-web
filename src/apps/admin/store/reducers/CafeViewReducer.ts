import {
    CafeViewAction,
    CafeViewActionTypes,
  } from "../actions/CafeViewActions";
  import { createSelector } from "reselect";
  
  export interface CafeViewState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
  }
  
  const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
  };
  
  export function CafeViewReducer(
    state = initialState,
    action: CafeViewAction
  ): CafeViewState {
    switch (action.type) {
      case CafeViewActionTypes.CAFE_VIEW_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: false,
          data: undefined,
        };
      case CafeViewActionTypes.CAFE_VIEW_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: false,
          data: action.data,
        };
      case CafeViewActionTypes.CAFE_VIEW_ERROR:
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
  
  const cafeViewSelector = (store: { cafeView: CafeViewState }) =>
    store.cafeView;
  export const cafeViewResponse = createSelector(
    cafeViewSelector,
    (state) => state.data
  );
  export const cafeViewFetching = createSelector(
    cafeViewSelector,
    (state) => state.isFetching
  );