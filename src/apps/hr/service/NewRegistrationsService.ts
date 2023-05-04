import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { NewRegistrationsRequest, NewRegistrationsResponse } from "../../../tsModels/NewRegistrations.data";

export class NewRegistrationsService {
  public newRegistrations(request: NewRegistrationsRequest): Promise<NewRegistrationsResponse> | NewRegistrationsResponse {
    const service: ApiService = new ApiService(EndPoints.NewRegistrations);
    return service.get(request);
  }
}

const authService = new NewRegistrationsService();
export default authService;
