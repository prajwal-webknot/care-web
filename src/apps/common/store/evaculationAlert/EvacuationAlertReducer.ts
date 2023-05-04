import { EvacuationAlertAction, EvacuationAlertActionTypes } from './EvacuationAlertAction';
import { createSelector } from "reselect";

export interface EvacuationAlertState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function EvacuationAlertReducer(state = initialState, action: EvacuationAlertAction): EvacuationAlertState {
  switch (action.type) {
    case EvacuationAlertActionTypes.EVACUATION_ALERT_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case EvacuationAlertActionTypes.EVACUATION_ALERT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case EvacuationAlertActionTypes.EVACUATION_ALERT_ERROR:
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

const sendAlert = (store: { evacuationAlert: EvacuationAlertState }) => store.evacuationAlert;

export const sendAlertSelector = createSelector(sendAlert, (state) => state);
