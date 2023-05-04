import { EndPoints, DynamicQueryPath } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
  GetFteGuidelinesResponse,
  SetFteGuidelinesRequest,
  SetFteGuidelinesResponse
} from "../../../tsModels/FteGuidelines.data";

export class SitesService {
  public getFteGuidelines(path: DynamicQueryPath): Promise<GetFteGuidelinesResponse> | GetFteGuidelinesResponse {
    const service: ApiService = new ApiService(EndPoints.GetGuideLines);
    return service.get(path, '');
  }
  public setFteGuidelines(request: SetFteGuidelinesRequest): Promise<SetFteGuidelinesResponse> | SetFteGuidelinesResponse {
    const service: ApiService = new ApiService(EndPoints.SetGuideLines);
    return service.post(request.path, request.payload);
  }
}

const authService = new SitesService();
export default authService;
