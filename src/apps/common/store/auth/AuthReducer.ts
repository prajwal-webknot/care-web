import { createSelector } from 'reselect';
import { AuthAction, AuthActionTypes, AuthActions } from './AuthActions';

export interface AuthState {
  isFetching: boolean,
  error: boolean | any,
  data: any,
  authStatus: AUTH_STATUS;
}

export enum AUTH_STATUS {
  PENDING,
  SUCCESS,
  FAIL,
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
  authStatus: AUTH_STATUS.PENDING
};

export function AuthReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
        authStatus: AUTH_STATUS.SUCCESS
      };
    case AuthActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.data,
        data: undefined,
        authStatus: AUTH_STATUS.FAIL
      };
    case AuthActionTypes.CLEAR_REDUCER:
      return initialState;
    case AuthActions.checkUserValidity.done.type:
      return { ...state, authStatus: AUTH_STATUS.SUCCESS };
    case AuthActions.checkUserValidity.failed.type:
      return { ...state, authStatus: AUTH_STATUS.FAIL };

    case AuthActions.logoutUserAction.done.type:
      return { ...state, authStatus: AUTH_STATUS.PENDING };
    case AuthActions.logoutUserAction.failed.type:
      return { ...state, authStatus: AUTH_STATUS.SUCCESS };
    default:
      return state;
  }
}

const authSelector = (store: { auth: AuthState; }) => store.auth;

export const loginSelect = createSelector(authSelector, (state) => { return state; });
export const loginLoading = createSelector(authSelector, (state) => state.isFetching);
export const isAuthPending = createSelector(authSelector, (state) => { return state.authStatus === AUTH_STATUS.PENDING; });
export const isAuthFailed = createSelector(authSelector, (state) => { return state.authStatus === AUTH_STATUS.FAIL; });
export const isAuthSuccess = createSelector(authSelector, (state) => { return state.authStatus === AUTH_STATUS.SUCCESS; });
