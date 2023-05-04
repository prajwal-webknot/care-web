import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { EditExpectedVisitorsRequest, EditExpectedVisitorsResponse, ExpectedVisitorsRequest, ExpectedVisitorsResponse } from "../../../tsModels/ExpectedVisitors.data";

export class ExpectedVisitorsService {
  public expectedVisitors(request: ExpectedVisitorsRequest): Promise<ExpectedVisitorsResponse> | ExpectedVisitorsResponse {
    const service: ApiService = new ApiService(EndPoints.EPass);
    return service.get(request);
  }
  public editExpectedVisitors(
    request: EditExpectedVisitorsRequest
  ): Promise<EditExpectedVisitorsResponse> | EditExpectedVisitorsResponse {
    const service: ApiService = new ApiService(EndPoints.EditExpectedVisitor);
    return service.patch(request.path, request.payload);
  }
}

const authService = new ExpectedVisitorsService();
export default authService;
