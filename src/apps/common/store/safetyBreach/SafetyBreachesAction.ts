
import { SafetyBreachesRequest, SafetyBreachesResponse } from '../../../../tsModels/SafetyBreaches.data';

export enum SafetyBreachesActionTypes {
  SAFETY_BREACHES_REQUEST = "SAFETY_BREACHES_REQUEST",
  SAFETY_BREACHES_SUCCESS = "SAFETY_BREACHES_SUCCESS",
  SAFETY_BREACHES_ERROR = "SAFETY_BREACHES_ERROR",
}

export interface SafetyBreachesAction {
  type: SafetyBreachesActionTypes,
  data: SafetyBreachesRequest | SafetyBreachesResponse | Error;
}

export class SafetyBreachesActions {
  public static safetyBreachesRequest(request: SafetyBreachesRequest): SafetyBreachesAction {
    return { type: SafetyBreachesActionTypes.SAFETY_BREACHES_REQUEST, data: request }
  }
  public static safetyBreachesSuccess(request: SafetyBreachesRequest): SafetyBreachesAction {
    return { type: SafetyBreachesActionTypes.SAFETY_BREACHES_SUCCESS, data: request }
  }
  public static safetyBreachesFailure(error: Error): SafetyBreachesAction {
    return { type: SafetyBreachesActionTypes.SAFETY_BREACHES_ERROR, data: error }
  }
}

