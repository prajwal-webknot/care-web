import { put, takeLatest } from "redux-saga/effects";
import {
  StatusChangeActionTypes,
  StatusChangeAction,
  StatusChangeActions
} from "../actions/StatusChangeAction";
import AuthService from "../../service/ChangeStatusService";
import { StatusChangeRequest, StatusChangeResponse } from "../../../../tsModels/EmployeesList.data";
function* statusChange(payload: StatusChangeRequest): IterableIterator<any> {
  try {
    const response: undefined | StatusChangeResponse = yield AuthService.StatusChange(payload);
    yield put(StatusChangeActions.statusChangeSuccess(response as any));
  } catch (error) {
    yield put(StatusChangeActions.statusChangeResponse(error as any));
  }
}
function* statusChangeTemp(payload: StatusChangeRequest): IterableIterator<any> {
  try {
    const response: undefined | StatusChangeResponse = yield AuthService.patchTempVisitor(payload);
    yield put(StatusChangeActions.statusChangeTempSuccess(response as any));
  } catch (error) {
    yield put(StatusChangeActions.statusChangeTempResponse(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(StatusChangeActionTypes.STATUS_CHANGE_REQUEST, (action: StatusChangeAction) => statusChange(action.data as StatusChangeRequest));
  yield takeLatest(
    StatusChangeActionTypes.STATUS_CHANGE_TEMP_REQUEST,
    (action: StatusChangeAction) =>
    statusChangeTemp(action.data as StatusChangeRequest)
  );
}

export default authWatcher;
