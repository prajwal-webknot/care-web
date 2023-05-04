import { put, takeLatest } from "redux-saga/effects";
import {
  AuthAction,
  AuthActions,
  AuthActionTypes,
} from "./AuthActions";
import AuthService from "./AuthService";
import { AuthRequest, AuthResponse, LogoutResponse } from "./Auth.data";

function* login(payload: AuthRequest): IterableIterator<any> {
  try {
    const response: undefined | AuthResponse = yield AuthService.login(payload);
    if (response) {
      let token = '';
      let refreshToken = '';
      const splitTokenArr = (response as AuthResponse)?.data?.token.split(" ");
      const userId = (response as AuthResponse)?.data?.user_obj?.user_id;
      const userName = (response as AuthResponse)?.data?.user_obj?.username;
      if (splitTokenArr.length > 0) {
        token = `${splitTokenArr[0]} ${splitTokenArr[1]}`;
        refreshToken = splitTokenArr[2];
      }
      const siteId = (response as AuthResponse)?.data?.user_obj?.user_details?.site?.id;
      localStorage.setItem("siteId", siteId?.toString());
      localStorage.setItem("userId", userId?.toString());
      localStorage.setItem("userName", userName?.toString());
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }
    yield put(AuthActions.loginSuccess(response as any));
  } catch (error) {
    yield put(AuthActions.loginFailure(error));
  }
}

function* isValidUser() {
  try {
    const localToken: string | null = localStorage.getItem("token");
    if (localToken && localToken.length > 0) {
      yield put(AuthActions.checkUserValidity.done({ params: undefined, result: undefined }));
    } else {
      throw new Error("No user details found");
    }
  } catch (error) {
    yield put(AuthActions.checkUserValidity.failed(error));
  }
}

function* logoutUser() {
  try {
    const response: undefined | LogoutResponse = yield AuthService.logout({ refresh: localStorage.getItem('refreshToken') });
    localStorage.clear();
    yield put(AuthActions.logoutUserAction.done({ params: undefined, result: undefined }));
  } catch (error) {
    yield put(AuthActions.logoutUserAction.failed(error));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(AuthActionTypes.LOGIN_REQUEST, (action: AuthAction) => login(action.data as AuthRequest));
  yield takeLatest(AuthActions.checkUserValidity.started.type, isValidUser);
  yield takeLatest(AuthActions.logoutUserAction.started.type, logoutUser);
}

export default authWatcher;
