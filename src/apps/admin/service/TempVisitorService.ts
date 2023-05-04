import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { PostTempVisitorRequest, PostTempVisitorResponse } from "../../../tsModels/TempVisitor.data";

export class TempVisitorService {
  
  public postVisitor(request: PostTempVisitorRequest): Promise<PostTempVisitorResponse> | PostTempVisitorResponse {
    const service: ApiService = new ApiService(EndPoints.TempVisitor);
    return service.post({}, request);
  }
}

const authService = new TempVisitorService();
export default authService;