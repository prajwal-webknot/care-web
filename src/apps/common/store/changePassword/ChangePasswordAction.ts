
import { ChangePasswordRequest, ChangePasswordResponse } from './ChangePassword.data';

export enum ChangePasswordActionTypes {
  CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR",
}

export interface ChangePasswordAction {
  type: ChangePasswordActionTypes | ChangePasswordActionTypes,
  data: ChangePasswordRequest | ChangePasswordResponse | Error | boolean;
}

export class ChangePasswordActions {
  public static ChangePasswordRequest(request: ChangePasswordRequest): ChangePasswordAction {
    return { type: ChangePasswordActionTypes.CHANGE_PASSWORD_REQUEST, data: request };
  }
  public static ChangePasswordSuccess(request: ChangePasswordRequest): ChangePasswordAction {
    return { type: ChangePasswordActionTypes.CHANGE_PASSWORD_SUCCESS, data: request };
  }
  public static ChangePasswordFailure(error: Error | boolean): ChangePasswordAction {
    return { type: ChangePasswordActionTypes.CHANGE_PASSWORD_ERROR, data: error };
  }
}

