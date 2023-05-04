import { EmergencyDetailsAction, EmergencyDetailsActionTypes } from '../actions/EmergencyDetailsAction';

export interface EmergencyDetailsState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
}

export function EmergencyDetailsReducer(state = initialState, action: EmergencyDetailsAction): EmergencyDetailsState {
  switch (action.type) {
    case EmergencyDetailsActionTypes.EMERGENCY_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      }
    case EmergencyDetailsActionTypes.EMERGENCY_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      }
    case EmergencyDetailsActionTypes.EMERGENCY_DETAILS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      }
    default:
    return state
  }
}
