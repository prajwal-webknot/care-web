import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { RosterGuestRequest, RosterGuestResponse } from "../../../tsModels/RosterGuest.data";

export class RosterGuestService {

    public postRosterGuest(request: RosterGuestRequest): Promise<RosterGuestResponse> | RosterGuestResponse {
        const service: ApiService = new ApiService(EndPoints.GuestRoster);
        return service.post({}, request);
    }
}

const authService = new RosterGuestService();
export default authService;