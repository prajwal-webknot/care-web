import { EndPoints } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { AuthRequest, AuthResponse, LogoutRequest, LogoutResponse } from "./Auth.data";

export class AuthService {
  public login(request: AuthRequest): Promise<AuthResponse> | AuthResponse {
    const service: ApiService = new ApiService(EndPoints.Auth);
    return service.post({}, request);
  }
  public logout(request: LogoutRequest): Promise<LogoutResponse> | LogoutResponse {
    const service: ApiService = new ApiService(EndPoints.Logout);
    return service.post({}, request);
  }
}

const authService = new AuthService();
export default authService;
