import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { DateBasedEmployesRequest, DateBasedEmployesResponse } from "../../../tsModels/DateBasedEmployes.data";

export class DateBasedEmployesService {
    public getDateBasedEmployes(request: DateBasedEmployesRequest): Promise<DateBasedEmployesResponse> | DateBasedEmployesResponse {
        const service: ApiService = new ApiService(EndPoints.DateBasedEmployes);
        return service.get(request);
    }
}

const authService = new DateBasedEmployesService();
export default authService;