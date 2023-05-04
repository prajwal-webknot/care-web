import { createSelector } from 'reselect';
import { SafetyBreachesAction, SafetyBreachesActionTypes } from './SafetyBreachesAction';

export interface SafetyBreachesState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function SafetyBreachesReducer(state = initialState, action: SafetyBreachesAction): SafetyBreachesState {
  switch (action.type) {
    case SafetyBreachesActionTypes.SAFETY_BREACHES_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case SafetyBreachesActionTypes.SAFETY_BREACHES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case SafetyBreachesActionTypes.SAFETY_BREACHES_ERROR:
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

const safetyBreachesSelector = (store: { safetyBreaches: SafetyBreachesState; }) => store.safetyBreaches;
export const safetyBreachesResp = createSelector(safetyBreachesSelector, (state) => state.data);
export const safetyBreachesLoading = createSelector(safetyBreachesSelector, (state) => state.isFetching);

