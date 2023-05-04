
import { UserDetailsRequest, UserDetailsResponse, DeleteUserRequest, DeleteUserResponse } from './UserDetails.data';

export enum UserDetailsActionTypes {
  USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST",
  USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS",
  USER_DETAILS_ERROR = "USER_DETAILS_ERROR",
  CLEAR_REDUCER = "CLEAR_REDUCER",
  DELETE_USER_REQUEST = "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE = "DELETE_USER_FAILURE",
}

export interface UserDetailsAction {
  type: UserDetailsActionTypes,
  data: UserDetailsRequest | UserDetailsResponse | DeleteUserRequest | DeleteUserResponse | Error;
}

export class UserDetailsActions {

  public static userDetailsRequest(request: UserDetailsRequest): UserDetailsAction {
    return { type: UserDetailsActionTypes.USER_DETAILS_REQUEST, data: request };
  }
  public static userDetailsSuccess(request: UserDetailsRequest): UserDetailsAction {
    return { type: UserDetailsActionTypes.USER_DETAILS_SUCCESS, data: request };
  }
  public static userDetailsFailure(error: Error): UserDetailsAction {
    return { type: UserDetailsActionTypes.USER_DETAILS_ERROR, data: error };
  }
  public static clearReducer() {
    return { type: UserDetailsActionTypes.CLEAR_REDUCER };
  }
  public static deleteUserRequest(request: DeleteUserRequest): UserDetailsAction {
    return { type: UserDetailsActionTypes.DELETE_USER_REQUEST, data: request };
  }
  public static deleteUserSuccess(request: DeleteUserRequest): UserDetailsAction {
    return { type: UserDetailsActionTypes.DELETE_USER_SUCCESS, data: request };
  }
  public static deleteUserFailure(error: Error): UserDetailsAction {
    return { type: UserDetailsActionTypes.DELETE_USER_FAILURE, data: error };
  }
}

