
import { EvacuationAlertRequest, EvacuationAlertResponse } from '../../../../tsModels/EvacuationAlert.data';

export enum EvacuationAlertActionTypes {
  EVACUATION_ALERT_REQUEST = "EVACUATION_ALERT_REQUEST",
  EVACUATION_ALERT_SUCCESS = "EVACUATION_ALERT_SUCCESS",
  EVACUATION_ALERT_ERROR = "EVACUATION_ALERT_ERROR",
}

export interface EvacuationAlertAction {
  type: EvacuationAlertActionTypes,
  data: EvacuationAlertRequest | EvacuationAlertResponse | Error;
}

export class EvacuationAlertActions {
  public static sendEvacuationAlertRequest(request: EvacuationAlertRequest): EvacuationAlertAction {
    return { type: EvacuationAlertActionTypes.EVACUATION_ALERT_REQUEST, data: request }
  }
  public static sendEvacuationAlertSuccess(request: EvacuationAlertRequest): EvacuationAlertAction {
    return { type: EvacuationAlertActionTypes.EVACUATION_ALERT_SUCCESS, data: request }
  }
  public static sendEvacuationAlertFailure(error: Error): EvacuationAlertAction {
    return { type: EvacuationAlertActionTypes.EVACUATION_ALERT_ERROR, data: error }
  }
}

