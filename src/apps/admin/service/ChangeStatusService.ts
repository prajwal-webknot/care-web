import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { StatusChangeRequest, StatusChangeResponse } from "../../../tsModels/EmployeesList.data";

export class ChangeStatusService {
  public StatusChange(request: StatusChangeRequest): Promise<StatusChangeResponse> | StatusChangeResponse {
    const service: ApiService = new ApiService(EndPoints.EPass);
    return service.post(request.path, request.payload);
  }
  public patchTempVisitor(
    request: StatusChangeRequest
  ): Promise<StatusChangeResponse> | StatusChangeResponse {
    const service: ApiService = new ApiService(EndPoints.ExitTempVisitor);
    return service.patch(request.path, request.payload);
  }
}

const authService = new ChangeStatusService();
export default authService;
