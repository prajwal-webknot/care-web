import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { ConferenceRequest, ConferenceResponse } from "../../../tsModels/Conference.data";

export class ConferenceService {

    //for fetching availableRoom
    public postConferenceRoom(request: ConferenceRequest): Promise<ConferenceResponse> | ConferenceResponse {
        const service: ApiService = new ApiService(EndPoints.ConferenceRoom);
        return service.post({}, request);
    }
    public postConferenceRoomBook(request: ConferenceRequest): Promise<ConferenceResponse> | ConferenceResponse {
        const service: ApiService = new ApiService(EndPoints.ConferenceRoomBook);
        return service.post({}, request);
    }
}

const authService = new ConferenceService();
export default authService;
