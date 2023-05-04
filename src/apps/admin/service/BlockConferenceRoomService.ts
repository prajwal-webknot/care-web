import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { BlockConferenceRoomRequest, BlockConferenceRoomResponse } from "../../../tsModels/BlockConferenceRoom.data";


export class BlockConferenceRoomService {
    public getConferenceRoomBookings(
        request: BlockConferenceRoomRequest
    ): Promise<BlockConferenceRoomResponse> | BlockConferenceRoomResponse {
        const service: ApiService = new ApiService(EndPoints.BlockConferenceRoom);
        return service.post({}, request);
    }
    // public patchBlockConferenceRoom(
    //     request: EditBlockConferenceRoomRequest
    // ): Promise<EditBlockConferenceRoomResponse> | EditBlockConferenceRoomResponse {
    //     const service: ApiService = new ApiService(EndPoints.EditHotDesk);
    //     return service.patch(request.path, request.payload);
    // }
}

const authService = new BlockConferenceRoomService();
export default authService;
