import { NotificationsAction, MarkNotificationsActionTypes } from './NotificationsAction';
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

export function MarkNotificationsReducer(state = initialState, action: NotificationsAction): NotificationsState {
  switch (action.type) {
    case MarkNotificationsActionTypes.MARK_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case MarkNotificationsActionTypes.MARK_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case MarkNotificationsActionTypes.MARK_NOTIFICATIONS_ERROR:
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

const markNotificationSelector = (store: { markNotification: NotificationsState; }) => store.markNotification;

export const markNotificationSelect = createSelector(markNotificationSelector, (state) => state.data);
