
import { EmergencyDetailsRequest, EmergencyDetailsResponse } from '../../../../tsModels/EmergencyDetails.data';

export enum EmergencyDetailsActionTypes {
  EMERGENCY_DETAILS_REQUEST = "EMERGENCY_DETAILS_REQUEST",
  EMERGENCY_DETAILS_SUCCESS = "EMERGENCY_DETAILS_SUCCESS",
  EMERGENCY_DETAILS_ERROR = "EMERGENCY_DETAILS_ERROR",
}

export interface EmergencyDetailsAction {
  type: EmergencyDetailsActionTypes,
  data: EmergencyDetailsRequest | EmergencyDetailsResponse | Error;
}

export class EmergencyDetailsActions {
  public static getEmergencyDetailsRequest(request: EmergencyDetailsRequest): EmergencyDetailsAction {
    return { type: EmergencyDetailsActionTypes.EMERGENCY_DETAILS_REQUEST, data: request }
  }
  public static getEmergencyDetailsSuccess(request: EmergencyDetailsRequest): EmergencyDetailsAction {
    return { type: EmergencyDetailsActionTypes.EMERGENCY_DETAILS_SUCCESS, data: request }
  }
  public static getEmergencyDetailsFailure(error: Error): EmergencyDetailsAction {
    return { type: EmergencyDetailsActionTypes.EMERGENCY_DETAILS_ERROR, data: error }
  }
}

