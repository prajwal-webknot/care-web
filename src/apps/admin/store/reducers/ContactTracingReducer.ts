import { ContactTracingAction, ContactTracingActionTypes } from '../actions/ContactTracingAction';
import { createSelector } from "reselect";

export interface ContactTracingState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function ContactTracingReducer(state = initialState, action: ContactTracingAction): ContactTracingState {
  switch (action.type) {
    case ContactTracingActionTypes.CONTACT_TRACING_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case ContactTracingActionTypes.CONTACT_TRACING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case ContactTracingActionTypes.CONTACT_TRACING_ERROR:
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

const contactTracingSelector = (store: { contactTracing: ContactTracingState; }) => store.contactTracing;
export const contactTracingResponse = createSelector(contactTracingSelector, (state) => state.data);
export const contactTracingFetching = createSelector(contactTracingSelector, (state) => state.isFetching);
