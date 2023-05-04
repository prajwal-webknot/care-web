import { EndPoints } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { UserDetailsRequest, UserDetailsResponse, DeleteUserRequest, DeleteUserResponse } from "./UserDetails.data";

export class UserDetailsService {
  public userDetails(request: UserDetailsRequest): Promise<UserDetailsResponse> | UserDetailsResponse {
    const service: ApiService = new ApiService(EndPoints.UserDetails);
    return service.get(request);
  }
  public deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> | DeleteUserResponse {
    const service: ApiService = new ApiService(EndPoints.UserDetails);
    return service.delete(request);
  }
}

const userDetailsService = new UserDetailsService();
export default userDetailsService;
