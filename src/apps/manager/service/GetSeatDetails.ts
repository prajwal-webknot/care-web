import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { GetSeatDetailsRequest, GetSeatDetailsResponse } from "../../../tsModels/GetSeatDetails.data";

export class GetSeatDetailsService {
    public getSeatDetails(request: GetSeatDetailsRequest): Promise<GetSeatDetailsResponse> | GetSeatDetailsResponse {
        const service: ApiService = new ApiService(EndPoints.GetSeatDetails);
        return service.get(request);
    }
}

const authService = new GetSeatDetailsService();
export default authService;
