import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
  HotDeskingRequest,
  HotDeskingResponse,
  EditHotDeskingRequest,
  EditHotDeskingResponse,
} from "../../../tsModels/HotDesking.data";

export class HotDeskingService {
  public getHotDesking(
    request: HotDeskingRequest
  ): Promise<HotDeskingResponse> | HotDeskingResponse {
    const service: ApiService = new ApiService(EndPoints.hotDesking);
    return service.get(request);
  }
  public patchHotDesking(
    request: EditHotDeskingRequest
  ): Promise<EditHotDeskingResponse> | EditHotDeskingResponse {
    const service: ApiService = new ApiService(EndPoints.EditHotDesk);
    return service.patch(request.path, request.payload);
  }
  public getAvailableSeats(
    request: HotDeskingRequest
  ): Promise<HotDeskingResponse> | HotDeskingResponse {
    const service: ApiService = new ApiService(EndPoints.availableSeats);
    return service.get(request);
  }
}

const authService = new HotDeskingService();
export default authService;
