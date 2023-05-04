
import { NotificationsRequest, NotificationsResponse, MarkNotificationsRequest, MarkNotificationsResponse } from '../../../../tsModels/Notifications.data';

export enum NotificationsActionTypes {
  GET_NOTIFICATIONS_REQUEST = "GET_NOTIFICATIONS_REQUEST",
  GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS",
  GET_NOTIFICATIONS_ERROR = "GET_NOTIFICATIONS_ERROR",
}
export enum MarkNotificationsActionTypes {
  MARK_NOTIFICATIONS_REQUEST = "MARK_NOTIFICATIONS_REQUEST",
  MARK_NOTIFICATIONS_SUCCESS = "MARK_NOTIFICATIONS_SUCCESS",
  MARK_NOTIFICATIONS_ERROR = "MARK_NOTIFICATIONS_ERROR",
}

export interface NotificationsAction {
  type: NotificationsActionTypes | MarkNotificationsActionTypes,
  data: NotificationsRequest | NotificationsResponse | Error;
}
export interface MarkNotificationsAction {
  type: NotificationsActionTypes | MarkNotificationsActionTypes,
  data: MarkNotificationsRequest | MarkNotificationsResponse | Error;
}

export class NotificationsActions {
  public static getNotificationsRequest(request: NotificationsRequest): NotificationsAction {
    return { type: NotificationsActionTypes.GET_NOTIFICATIONS_REQUEST, data: request };
  }
  public static getNotificationsSuccess(request: NotificationsRequest): NotificationsAction {
    return { type: NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS, data: request };
  }
  public static getNotificationsFailure(error: Error): NotificationsAction {
    return { type: NotificationsActionTypes.GET_NOTIFICATIONS_ERROR, data: error };
  }
  public static markNotificationsReadRequest(request: MarkNotificationsRequest): MarkNotificationsAction {
    return { type: MarkNotificationsActionTypes.MARK_NOTIFICATIONS_REQUEST, data: request };
  }
  public static markNotificationsReadSuccess(request: MarkNotificationsRequest): MarkNotificationsAction {
    return { type: MarkNotificationsActionTypes.MARK_NOTIFICATIONS_SUCCESS, data: request };
  }
  public static markNotificationsReadFailure(error: Error): MarkNotificationsAction {
    return { type: MarkNotificationsActionTypes.MARK_NOTIFICATIONS_ERROR, data: error };
  }
}

