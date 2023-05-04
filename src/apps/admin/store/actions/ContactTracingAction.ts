
import { ContactTracingRequest, ContactTracingResponse } from '../../../../tsModels/ContactTracing.data';

export enum ContactTracingActionTypes {
  CONTACT_TRACING_REQUEST = "CONTACT_TRACING_REQUEST",
  CONTACT_TRACING_SUCCESS = "CONTACT_TRACING_SUCCESS",
  CONTACT_TRACING_ERROR = "CONTACT_TRACING_ERROR",
}

export interface ContactTracingAction {
  type: ContactTracingActionTypes,
  data: ContactTracingRequest | ContactTracingResponse | Error;
}

export class ContactTracingActions {
  public static getContactTracingRequest(request: ContactTracingRequest): ContactTracingAction {
    return { type: ContactTracingActionTypes.CONTACT_TRACING_REQUEST, data: request };
  }
  public static getContactTracingSuccess(request: ContactTracingRequest): ContactTracingAction {
    return { type: ContactTracingActionTypes.CONTACT_TRACING_SUCCESS, data: request };
  }
  public static getContactTracingFailure(error: Error): ContactTracingAction {
    return { type: ContactTracingActionTypes.CONTACT_TRACING_ERROR, data: error };
  }
}

