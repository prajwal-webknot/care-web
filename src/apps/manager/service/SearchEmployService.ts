import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { SearchEmployRequest, SearchEmployResponse } from "../../../tsModels/SearchEmploy.data";

export class SearchEmployService {
    public getRoster(request: SearchEmployRequest): Promise<SearchEmployResponse> | SearchEmployResponse {
        const service: ApiService = new ApiService(EndPoints.SearchEmploy);
        return service.get(request);
    }
}

const authService = new SearchEmployService();
export default authService;