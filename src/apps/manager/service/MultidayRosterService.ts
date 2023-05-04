import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { MultidayRosterRequest, MultidayRosterResponse } from "../../../tsModels/MultidayRoster.data";

export class MultidayRosterService {

    public postRoster(request: MultidayRosterRequest): Promise<MultidayRosterResponse> | MultidayRosterResponse {
        const service: ApiService = new ApiService(EndPoints.MultidayRoster);
        return service.post({}, request);
    }
}

const authService = new MultidayRosterService();
export default authService;
