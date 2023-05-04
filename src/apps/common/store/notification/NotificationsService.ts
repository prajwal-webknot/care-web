import { EndPoints, DynamicQueryPath } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { NotificationsRequest, NotificationsResponse, MarkNotificationsRequest, MarkNotificationsResponse } from "../../../../tsModels/Notifications.data";
import { MarkNotificationsAction } from "./NotificationsAction";

export class NotificationsService {
  public GetNotifications(request: DynamicQueryPath): Promise<NotificationsResponse> | NotificationsResponse {
    const service: ApiService = new ApiService(EndPoints.Notifications);
    return service.get(request);
  }
  public MarkNotifications(request: MarkNotificationsRequest): Promise<MarkNotificationsResponse> | MarkNotificationsAction {
    const service: ApiService = new ApiService(EndPoints.Notifications);
    return service.patch({}, request);
  }
}

const notificationService = new NotificationsService();
export default notificationService;
