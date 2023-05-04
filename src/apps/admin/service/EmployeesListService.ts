import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { EmployeesListRequest, EmployeesListResponse, StatusChangeRequest, StatusChangeResponse } from "../../../tsModels/EmployeesList.data";

export class EmployeesListService {
  public employeesList(request: EmployeesListRequest): Promise<EmployeesListResponse> | EmployeesListResponse {
    const service: ApiService = new ApiService(EndPoints.EPass);
    return service.get(request);
  }

  public StatusChange(request: StatusChangeRequest): Promise<StatusChangeResponse> | StatusChangeResponse {
    const service: ApiService = new ApiService(EndPoints.EPass);
    return service.put(request.path, request.payload);
  }
}

const authService = new EmployeesListService();
export default authService;
