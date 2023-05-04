
import { StatusChangeRequest, StatusChangeResponse   } from '../../../../tsModels/EmployeesList.data';

export enum StatusChangeActionTypes {
  STATUS_CHANGE_REQUEST = "STATUS_CHANGE_REQUEST",
  STATUS_CHANGE_SUCCESS = "STATUS_CHANGE_SUCCESS",
  STATUS_CHANGE_ERROR = "STATUS_CHANGE_ERROR",
  STATUS_CHANGE_TEMP_REQUEST = "STATUS_CHANGE_TEMP_REQUEST",
  STATUS_CHANGE_TEMP_SUCCESS = "STATUS_CHANGE_TEMP_SUCCESS",
  STATUS_CHANGE_TEMP_ERROR = "STATUS_CHANGE_TEMP_ERROR",
}


export interface StatusChangeAction {
  type: StatusChangeActionTypes,
  data: StatusChangeRequest | StatusChangeResponse | Error;
}

export class StatusChangeActions {
  public static statusChangeRequest(request: StatusChangeRequest): StatusChangeAction {
    return { type: StatusChangeActionTypes.STATUS_CHANGE_REQUEST, data: request };
  }
  public static statusChangeSuccess(request: StatusChangeRequest): StatusChangeAction {
    return { type: StatusChangeActionTypes.STATUS_CHANGE_SUCCESS, data: request };
  }
  public static statusChangeResponse(error: Error): StatusChangeAction {
    return { type: StatusChangeActionTypes.STATUS_CHANGE_ERROR, data: error };
  }
  public static statusChangeTempRequest(request: StatusChangeRequest): StatusChangeAction {
    return { type: StatusChangeActionTypes.STATUS_CHANGE_TEMP_REQUEST, data: request };
  }
  public static statusChangeTempSuccess(request: StatusChangeRequest): StatusChangeAction {
    return { type: StatusChangeActionTypes.STATUS_CHANGE_TEMP_SUCCESS, data: request };
  }
  public static statusChangeTempResponse(error: Error): StatusChangeAction {
    return { type: StatusChangeActionTypes.STATUS_CHANGE_TEMP_ERROR, data: error };
  }
  
}

