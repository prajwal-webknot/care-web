import { EndPoints } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { CensusRequest, CensusResponse } from "../../../../tsModels/Census.data";

export class CensusService {
  public census(request: CensusRequest): Promise<CensusResponse> | CensusResponse {
    const service: ApiService = new ApiService(EndPoints.Census);
    return service.get(request);
  }
}

const authService = new CensusService();
export default authService;
