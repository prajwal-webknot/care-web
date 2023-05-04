import { EndPoints, DynamicQueryPath } from "../ApiConfig.data";
import ApiService from "../../RootApiService";
import { LocationResponse } from "./Location.data";

export class LocationService {
  public getLocations(path: DynamicQueryPath): Promise<LocationResponse> | LocationResponse {
    const service: ApiService = new ApiService(EndPoints.Locations);
    return service.get(path);
  }
}

const authService = new LocationService();
export default authService;
