
interface notifObj {
  id: Number;
  created_on: Number;
  is_read: boolean;
  data: string;
  user: Number;
  client: string;
  type: string;
  updated_on: Number;
}
export interface NotificationsRequest {

}

export interface NotificationsResponse {
  data: notifObj[];
}

export interface MarkNotificationsRequest {
  notification_id_list: Number[];
}

export interface MarkNotificationsResponse {
  message: string;
}

