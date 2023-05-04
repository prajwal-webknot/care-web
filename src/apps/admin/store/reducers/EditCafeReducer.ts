import {
    LunchSeatsActionTypes,
    LunchSeatsAction
  } from '../actions/LunchSeatsAction';
  import { createSelector } from "reselect";
  
  export interface EditCafeState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined,
  }
  
  
  const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
  };
  
  export function EditCafeReducer(state = initialState, action: LunchSeatsAction | LunchSeatsAction): EditCafeState {
    switch (action.type) {
      case LunchSeatsActionTypes.PATCH_LUNCH_SEAT_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: false,
          data: undefined,
        };
      case LunchSeatsActionTypes.PATCH_LUNCH_SEAT_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: false,
          data: action.data,
        };
      case LunchSeatsActionTypes.PATCH_LUNCH_SEAT_ERROR:
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
  
  const editCafeSelector = (store: { editCafe: EditCafeState; }) => store.editCafe;
  
  export const editCafe = createSelector(editCafeSelector, (state) => state.data);
  export const editCafeFull = createSelector(editCafeSelector, (state) => state);
  