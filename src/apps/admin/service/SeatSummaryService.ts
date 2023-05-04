import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
  SeatSummaryRequest,
  SeatSummaryResponse,
} from "../../../tsModels/SeatSummary.data";

export class SeatSummaryService {
  public SeatSummary(
    request: SeatSummaryRequest
  ): Promise<SeatSummaryResponse> | SeatSummaryResponse {
    const service: ApiService = new ApiService(EndPoints.seatSummary);
    return service.get(request);
  }
}

const authService = new SeatSummaryService();
export default authService;