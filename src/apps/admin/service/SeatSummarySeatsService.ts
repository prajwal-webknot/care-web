import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
  SeatSummarySeatsRequest,
  SeatSummarySeatsResponse,
  EditSeatSummarySeatRequest,
  EditSeatSummarySeatResponse
} from "../../../tsModels/SeatSummarySeats.data";

export class SeatSummarySeatsService {
  public SeatSummarySeats(
    request: SeatSummarySeatsRequest
  ): Promise<SeatSummarySeatsResponse> | SeatSummarySeatsResponse {
    const service: ApiService = new ApiService(EndPoints.seatSummarySeats);
    return service.get(request);
  }
  public patchSeatSummary(
    request: EditSeatSummarySeatRequest
  ): Promise<EditSeatSummarySeatResponse> | EditSeatSummarySeatResponse {
    const service: ApiService = new ApiService(EndPoints.editSeatSummarySeat);
    return service.patch(request.path, request.payload);
  }
}

const authService = new SeatSummarySeatsService();
export default authService;