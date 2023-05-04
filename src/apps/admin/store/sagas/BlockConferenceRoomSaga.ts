import { put, takeLatest } from "redux-saga/effects";

import BlockConferenceRoomService from "../../service/BlockConferenceRoomService";
import {
    BlockConferenceRoomRequest,
    BlockConferenceRoomResponse
} from "../../../../tsModels/BlockConferenceRoom.data";
import { BlockConferenceRoomAction, BlockConferenceRoomActions, BlockConferenceRoomActionTypes } from "../actions/BlockConferenceRoomAction";

function* conferenceRoomDetails(payload: BlockConferenceRoomRequest): IterableIterator<any> {
    try {
        const response:
            | undefined
            | BlockConferenceRoomResponse = yield BlockConferenceRoomService.getConferenceRoomBookings(payload);
        yield put(BlockConferenceRoomActions.BlockConferenceRoomSuccess(response as any));
    } catch (error) {
        yield put(BlockConferenceRoomActions.BlockConferenceRoomFailure(error as any));
    }
}


function* authWatcher(): IterableIterator<any> {
    yield takeLatest(
        BlockConferenceRoomActionTypes.BLOCK_CONFERENCE_ROOM_REQUEST,
        (action: BlockConferenceRoomAction) => conferenceRoomDetails(action.data as BlockConferenceRoomRequest)
    );
    // yield takeLatest(
    //     BlockConferenceRoomActionTypes.PATCH_CONFERENCE_ROOM_DETAILS_REQUEST,
    //     (action: BlockConferenceRoomAction) =>
    //         patchHotDeskRequest(action.data as EditBlockConferenceRoomRequest)
    // );
}

export default authWatcher;
