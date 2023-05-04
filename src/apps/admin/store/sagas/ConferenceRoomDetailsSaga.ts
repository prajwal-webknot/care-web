import { put, takeLatest } from "redux-saga/effects";
import {
    ConferenceRoomDetailsAction,
    ConferenceRoomDetailsActionTypes,
    ConferenceRoomDetailsActions,
} from "../actions/ConferenceRoomDetailsActions";
import ConferenceRoomDetailsService from "../../service/ConferenceRoomDetailsService";
import {
    ConferenceRoomDetailsRequest,
    ConferenceRoomDetailsResponse,
    EditConferenceRoomDetailsRequest,
    EditConferenceRoomDetailsResponse,
} from "../../../../tsModels/ConferenceRoomDetails.data";

function* conferenceRoomDetails(payload: ConferenceRoomDetailsRequest): IterableIterator<any> {
    try {
        const response:
            | undefined
            | ConferenceRoomDetailsResponse = yield ConferenceRoomDetailsService.getConferenceRoomBookings(payload);
        yield put(ConferenceRoomDetailsActions.getConferenceRoomDetailsSuccess(response as any));
    } catch (error) {
        yield put(ConferenceRoomDetailsActions.getConferenceRoomDetailsFailure(error as any));
    }
}

function* getConferenceRooms(payload: ConferenceRoomDetailsRequest): IterableIterator<any> {
    try {
        const response:
            | undefined
            | ConferenceRoomDetailsResponse = yield ConferenceRoomDetailsService.getConferenceRooms(payload);
        yield put(ConferenceRoomDetailsActions.getConferenceRoomsSuccess(response as any));
    } catch (error) {
        yield put(ConferenceRoomDetailsActions.getConferenceRoomsFailure(error as any));
    }
}

function* postSwapConference(payload: ConferenceRoomDetailsRequest): IterableIterator<any> {
    try {
        const response:
            | undefined
            | ConferenceRoomDetailsResponse = yield ConferenceRoomDetailsService.postConferenceSwap(payload);
        yield put(ConferenceRoomDetailsActions.postSwapConferenceSuccess(response as any));
    } catch (error) {
        yield put(ConferenceRoomDetailsActions.postSwapConferenceFailure(error as any));
    }
}
// function* patchHotDeskRequest(
//     payload: EditConferenceRoomDetailsRequest
// ): IterableIterator<any> {
//     try {
//         const response:
//             | undefined
//             | EditConferenceRoomDetailsResponse = yield ConferenceRoomDetailsService.patchConferenceRoomDetails(
//                 payload
//             );
//         yield put(ConferenceRoomDetailsActions.patchHotDeskSuccess(response as any));
//     } catch (error) {
//         yield put(ConferenceRoomDetailsActions.patchHotDeskFailure(error));
//     }
// }

function* authWatcher(): IterableIterator<any> {
    yield takeLatest(
        ConferenceRoomDetailsActionTypes.CONFERENCE_ROOM_DETAILS_REQUEST,
        (action: ConferenceRoomDetailsAction) => conferenceRoomDetails(action.data as ConferenceRoomDetailsRequest)
    );
    yield takeLatest(
        ConferenceRoomDetailsActionTypes.GET_CONFERENCE_ROOMS_REQUEST,
        (action: ConferenceRoomDetailsAction) => getConferenceRooms(action.data as ConferenceRoomDetailsRequest)
    );
    yield takeLatest(
        ConferenceRoomDetailsActionTypes.POST_SWAP_CONFERENCE_REQUEST,
        (action: ConferenceRoomDetailsAction) => postSwapConference(action.data as ConferenceRoomDetailsRequest)
    );
    // yield takeLatest(
    //     ConferenceRoomDetailsActionTypes.PATCH_CONFERENCE_ROOM_DETAILS_REQUEST,
    //     (action: ConferenceRoomDetailsAction) =>
    //         patchHotDeskRequest(action.data as EditConferenceRoomDetailsRequest)
    // );
}

export default authWatcher;
