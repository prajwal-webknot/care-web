import { NotificationsAction, NotificationsActionTypes } from './NotificationsAction';
import { createSelector } from "reselect";

export interface NotificationsState {
  isFetching: boolean,
  error: boolean | object,
  data: any | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function NotificationsReducer(state = initialState, action: NotificationsAction): NotificationsState {
  switch (action.type) {
    case NotificationsActionTypes.GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case NotificationsActionTypes.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
    default:
      return state;
  }
}

const notificationSelector = (store: { notification: NotificationsState; }) => store.notification;

export const notificationSelect = createSelector(notificationSelector, (state) => state.data);
export const notificationLoading = createSelector(notificationSelector, (state) => state.isFetching);
