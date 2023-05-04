import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
  CafeViewRequest,
  CafeViewResponse,
} from "../../../tsModels/CafeView.data";

export class LunchBookingService {
  public CafeSlots(
    request: CafeViewRequest
  ): Promise<CafeViewResponse> | CafeViewResponse {
    const service: ApiService = new ApiService(EndPoints.cafeView);
    return service.get(request);
  }
}

const authService = new LunchBookingService();
export default authService;
