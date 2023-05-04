import { put, takeLatest } from "redux-saga/effects";
import {
  ChangePasswordAction,
  ChangePasswordActions,
  ChangePasswordActionTypes
} from "./ChangePasswordAction";
import AuthService from "./ChangePasswordService";
import { ChangePasswordRequest, ChangePasswordResponse } from "./ChangePassword.data";

function* ChangePassword(payload: ChangePasswordRequest): IterableIterator<any> {

  try {
    const response: undefined | ChangePasswordResponse = yield AuthService.changePassword(payload);
    if (response) {
      let token = '';
      let refreshToken = '';
      const splitTokenArr = (response as ChangePasswordResponse)?.data?.token.split(" ");
      if (splitTokenArr.length > 0) {
        token = `${splitTokenArr[0]} ${splitTokenArr[1]}`;
        refreshToken = splitTokenArr[2];
      }
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }
    yield put(ChangePasswordActions.ChangePasswordSuccess(response as any));
  } catch (error) {
    yield put(ChangePasswordActions.ChangePasswordFailure(error));
  }
}


function* changePasswordWatcher(): IterableIterator<any> {
  yield takeLatest(ChangePasswordActionTypes.CHANGE_PASSWORD_REQUEST, (action: ChangePasswordAction) => ChangePassword(action.data as ChangePasswordRequest));
}

export default changePasswordWatcher;
