import { EndPoints } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { ChangePasswordRequest, ChangePasswordResponse } from "./ChangePassword.data";

export class ChangePasswordService {
  public changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse> | ChangePasswordResponse {
    const service: ApiService = new ApiService(EndPoints.ChangePassword);
    return service.post({}, request);
  }
}

const changePassService = new ChangePasswordService();
export default changePassService;
