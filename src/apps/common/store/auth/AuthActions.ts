
import actionCreatorFactory from 'typescript-fsa';
import { AuthRequest, AuthResponse } from './Auth.data';
const actionCreator = actionCreatorFactory('AUTH');

export enum AuthActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  CLEAR_REDUCER = "CLEAR_REDUCER",
}

export interface AuthAction {
  type: AuthActionTypes,
  data: AuthRequest | AuthResponse | Error;
}

export class AuthActions {
  public static loginRequest(request: AuthRequest): AuthAction {
    return { type: AuthActionTypes.LOGIN_REQUEST, data: request };
  }
  public static loginSuccess(request: AuthRequest): AuthAction {
    return { type: AuthActionTypes.LOGIN_SUCCESS, data: request };
  }
  public static loginFailure(error: Error): AuthAction {
    return { type: AuthActionTypes.LOGIN_ERROR, data: error };
  }
  public static clearReducer() {
    return { type: AuthActionTypes.CLEAR_REDUCER };
  }

  public static checkUserValidity = actionCreator.async<undefined, undefined, Error>('VALID_USER');

  public static logoutUserAction = actionCreator.async<undefined, undefined, Error>("LOGOUT_USER");

}

