import { SetFteGuidelinesAction, FteGuidelinesActionTypes } from '../actions/FteGuidelinesAction';
import { createSelector } from "reselect";

export interface FteGuidelinesState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function SetFteGuidelinesReducer(state = initialState, action: SetFteGuidelinesAction): FteGuidelinesState {
  switch (action.type) {
    case FteGuidelinesActionTypes.SET_FTE_GUIDELINES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case FteGuidelinesActionTypes.SET_FTE_GUIDELINES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case FteGuidelinesActionTypes.SET_FTE_GUIDELINES_ERROR:
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

const setFteSelector = (store: { setFteGuidelines: FteGuidelinesState; }) => store.setFteGuidelines;
export const setFteResp = createSelector(setFteSelector, (state) => state.data);
