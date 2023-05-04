import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { RosterRequest, RosterResponse } from "../../../tsModels/Roster.data";

export class RosterService {
  public getRoster(request: RosterRequest): Promise<RosterResponse> | RosterResponse {
    const service: ApiService = new ApiService(EndPoints.Roster);
    return service.get(request);
  }
  public postRoster(request: RosterRequest): Promise<RosterResponse> | RosterResponse {
    const service: ApiService = new ApiService(EndPoints.PostRoster);
    return service.post({}, request);
  }
}

const authService = new RosterService();
export default authService;
