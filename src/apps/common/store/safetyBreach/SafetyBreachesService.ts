import { EndPoints } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { SafetyBreachesRequest, SafetyBreachesResponse } from "../../../../tsModels/SafetyBreaches.data";

export class SafetyBreachesService {
  public safetyBreaches(request: SafetyBreachesRequest): Promise<SafetyBreachesResponse> | SafetyBreachesResponse {
    const service: ApiService = new ApiService(EndPoints.SafetyBreaches);
    return service.get(request);
  }
}

const authService = new SafetyBreachesService();
export default authService;
