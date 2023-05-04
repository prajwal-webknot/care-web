import { put, takeLatest } from "redux-saga/effects";
import {
  NotificationsAction,
  NotificationsActionTypes,
  NotificationsActions,
  MarkNotificationsActionTypes
} from "./NotificationsAction";
import AuthService from "./NotificationsService";
import { NotificationsResponse, MarkNotificationsResponse, MarkNotificationsRequest, NotificationsRequest } from "../../../../tsModels/Notifications.data";
import { DynamicQueryPath } from "../ApiConfig.data";

function* getNotifications(payload: DynamicQueryPath): IterableIterator<any> {

  try {
    const response: undefined | NotificationsResponse = yield AuthService.GetNotifications(payload);
    yield put(NotificationsActions.getNotificationsSuccess(response as any));
  } catch (error) {
    yield put(NotificationsActions.getNotificationsFailure(error as any));
  }
}

function* markNotifications(payload: MarkNotificationsRequest): IterableIterator<any> {

  try {
    const response: undefined | MarkNotificationsResponse = yield AuthService.MarkNotifications(payload);
    yield put(NotificationsActions.markNotificationsReadSuccess(response as any));
  } catch (error) {
    yield put(NotificationsActions.markNotificationsReadFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(NotificationsActionTypes.GET_NOTIFICATIONS_REQUEST, (action: NotificationsAction) => getNotifications(action.data as NotificationsRequest));
  yield takeLatest(MarkNotificationsActionTypes.MARK_NOTIFICATIONS_REQUEST, (action: NotificationsAction) => markNotifications(action.data as MarkNotificationsRequest));
}

export default authWatcher;
