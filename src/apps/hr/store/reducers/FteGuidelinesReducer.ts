import { createSelector } from 'reselect';
import { GetFteGuidelinesAction, FteGuidelinesActionTypes } from '../actions/FteGuidelinesAction';

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

export function GetFteGuidelinesReducer(state = initialState, action: GetFteGuidelinesAction): FteGuidelinesState {
  switch (action.type) {
    case FteGuidelinesActionTypes.GET_FTE_GUIDELINES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case FteGuidelinesActionTypes.GET_FTE_GUIDELINES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case FteGuidelinesActionTypes.GET_FTE_GUIDELINES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
    case FteGuidelinesActionTypes.CLEAR_FTE_GUIDELINE_REDUCER:
      return {
        isFetching: false,
        error: true,
        data: {},
      };

    default:
      return state;
  }
}

const getFteSelector = (store: { getFteGuidelines: FteGuidelinesState; }) => store.getFteGuidelines;
export const getFteResp = createSelector(getFteSelector, (state) => state.data);
