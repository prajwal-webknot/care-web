import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { ExpiredPassesRequest, ExpiredPassesResponse } from "../../../tsModels/ExpiredPasses.data";

export class ExpiredPassesService {
  public ExpiredPasses(request: ExpiredPassesRequest): Promise<ExpiredPassesResponse> | ExpiredPassesResponse {
    const service: ApiService = new ApiService(EndPoints.ExpireEPass);
    return service.get(request);
  }
}

const authService = new ExpiredPassesService();
export default authService;
