import { BlockConferenceRoomRequest, BlockConferenceRoomResponse } from "../../../../tsModels/BlockConferenceRoom.data";


export enum BlockConferenceRoomActionTypes {
    BLOCK_CONFERENCE_ROOM_REQUEST = "BLOCK_CONFERENCE_ROOM_REQUEST",
    BLOCK_CONFERENCE_ROOM_SUCCESS = "BLOCK_CONFERENCE_ROOM_SUCCESS",
    BLOCK_CONFERENCE_ROOM_ERROR = "BLOCK_CONFERENCE_ROOM_ERROR",

}

export interface BlockConferenceRoomAction {
    type: BlockConferenceRoomActionTypes;
    data: BlockConferenceRoomRequest | BlockConferenceRoomResponse | Error;
}

export class BlockConferenceRoomActions {
    public static BlockConferenceRoomRequest(
        request: BlockConferenceRoomRequest
    ): BlockConferenceRoomAction {
        return { type: BlockConferenceRoomActionTypes.BLOCK_CONFERENCE_ROOM_REQUEST, data: request };
    }
    public static BlockConferenceRoomSuccess(
        request: BlockConferenceRoomRequest
    ): BlockConferenceRoomAction {
        return { type: BlockConferenceRoomActionTypes.BLOCK_CONFERENCE_ROOM_SUCCESS, data: request };
    }
    public static BlockConferenceRoomFailure(error: Error): BlockConferenceRoomAction {
        return { type: BlockConferenceRoomActionTypes.BLOCK_CONFERENCE_ROOM_ERROR, data: error };
    }
}
