import { EndPoints } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { EvacuationAlertRequest, EvacuationAlertResponse } from "../../../../tsModels/EvacuationAlert.data";

export class  ExpiredPassesService {
  public EvacuationAlert(request: EvacuationAlertRequest): Promise<EvacuationAlertResponse> | EvacuationAlertResponse {
    const service: ApiService = new ApiService(EndPoints.EvacuationAlert);
    return service.post({}, request);
  }
}

const authService = new ExpiredPassesService();
export default authService;
