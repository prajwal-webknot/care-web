import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
    ConferenceRoomDetailsRequest,
    ConferenceRoomDetailsResponse,
    EditConferenceRoomDetailsRequest,
    EditConferenceRoomDetailsResponse,
} from "../../../tsModels/ConferenceRoomDetails.data";

export class ConferenceRoomDetailsService {
    public getConferenceRoomBookings(
        request: ConferenceRoomDetailsRequest
    ): Promise<ConferenceRoomDetailsResponse> | ConferenceRoomDetailsResponse {
        const service: ApiService = new ApiService(EndPoints.getConferenceBookings);
        return service.get(request);
    }
    public getConferenceRooms(
        request: ConferenceRoomDetailsRequest
    ): Promise<ConferenceRoomDetailsResponse> | ConferenceRoomDetailsResponse {
        const service: ApiService = new ApiService(EndPoints.getConferenceRooms);
        return service.get(request);
    }
    public postConferenceSwap(
        request: ConferenceRoomDetailsRequest
    ): Promise<ConferenceRoomDetailsResponse> | ConferenceRoomDetailsResponse {
        const service: ApiService = new ApiService(EndPoints.SwapConferenceRoom);
        return service.post({}, request);
    }

}

const authService = new ConferenceRoomDetailsService();
export default authService;
