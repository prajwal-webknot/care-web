
import { NewRegistrationsRequest, NewRegistrationsResponse } from '../../../../tsModels/NewRegistrations.data';

export enum NewRegistrationsActionTypes {
  NEW_REGISTRATIONS_REQUEST = "NEW_REGISTRATIONS_REQUEST",
  NEW_REGISTRATIONS_SUCCESS = "NEW_REGISTRATIONS_SUCCESS",
  NEW_REGISTRATIONS_ERROR = "NEW_REGISTRATIONS_ERROR",
}

export interface NewRegistrationsAction {
  type: NewRegistrationsActionTypes,
  data: NewRegistrationsRequest | NewRegistrationsResponse | Error;
}

export class NewRegistrationsActions {
  public static newRegistrationsRequest(request: NewRegistrationsRequest): NewRegistrationsAction {
    return { type: NewRegistrationsActionTypes.NEW_REGISTRATIONS_REQUEST, data: request }
  }
  public static newRegistrationsSuccess(request: NewRegistrationsRequest): NewRegistrationsAction {
    return { type: NewRegistrationsActionTypes.NEW_REGISTRATIONS_SUCCESS, data: request }
  }
  public static newRegistrationsFailure(error: Error): NewRegistrationsAction {
    return { type: NewRegistrationsActionTypes.NEW_REGISTRATIONS_ERROR, data: error }
  }
}

