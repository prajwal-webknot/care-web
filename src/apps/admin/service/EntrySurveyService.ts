import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { EntrySurveyRequest, EntrySurveyResponse } from "../../../tsModels/EntrySurvey.data";

export class EntrySurveyService {
  public survey(request: EntrySurveyRequest): Promise<EntrySurveyResponse> | EntrySurveyResponse {
    const service: ApiService = new ApiService(EndPoints.EntrySurvey);
    return service.get(request);
  }
  public postSurvey(request: EntrySurveyRequest): Promise<EntrySurveyResponse> | EntrySurveyResponse {
    const service: ApiService = new ApiService(EndPoints.PostSurvey);
    return service.post({}, request);
  }
}

const authService = new EntrySurveyService();
export default authService;
