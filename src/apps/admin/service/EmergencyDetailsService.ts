import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { EmergencyDetailsRequest, EmergencyDetailsResponse } from "../../../tsModels/EmergencyDetails.data";

export class  EmergencyDetailsService {
  public EmergencyDetails(request: EmergencyDetailsRequest): Promise<EmergencyDetailsResponse> | EmergencyDetailsResponse {
    const service: ApiService = new ApiService(EndPoints.EmergencyDetails);
    return service.get({});
  }
}

const authService = new EmergencyDetailsService();
export default authService;
