import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
  LunchSeatsRequest,
  LunchSeatsResponse,
  EditCafeRequest,
  EditCafeResponse,
} from "../../../tsModels/LunchSeats.data";

export class LunchBookingService {
  public LunchSeats(
    request: LunchSeatsRequest
  ): Promise<LunchSeatsResponse> | LunchSeatsResponse {
    const service: ApiService = new ApiService(EndPoints.LunchSeat);
    return service.get(request);
  }
  public patchLunchCafe(
    request: EditCafeRequest
  ): Promise<EditCafeResponse> | EditCafeResponse {
    const service: ApiService = new ApiService(EndPoints.EditCafe);
    return service.patch(request.path, request.payload);
  }
}

const authService = new LunchBookingService();
export default authService;
