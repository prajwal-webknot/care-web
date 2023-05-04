import { put, takeLatest } from "redux-saga/effects";
import { ConferenceRequest, ConferenceResponse } from "../../../../tsModels/Conference.data";
import {
    ConferenceActions,
    ConferenceAction,
    ConferenceActionTypes
} from "../actions/ConferenceAction";

import AuthService from "../../service/ConferenceService"
function* postConferenceRoomData(payload: ConferenceRequest): IterableIterator<any> {
    try {
        const response: undefined | ConferenceResponse = yield AuthService.postConferenceRoom(payload);
        yield put(ConferenceActions.postConferenceRoomSuccess(response as any));
    } catch (error) {
        yield put(ConferenceActions.postConferenceRoomFailure(error as any));
    }
}
function* postConferenceRoomBookData(payload: ConferenceRequest): IterableIterator<any> {
    try {
        const response: undefined | ConferenceResponse = yield AuthService.postConferenceRoomBook(payload);
        yield put(ConferenceActions.postConferenceRoomBookSuccess(response as any));
    } catch (error) {
        yield put(ConferenceActions.postConferenceRoomBookFailure(error as any));
    }
}


function* authWatcher(): IterableIterator<any> {
    yield takeLatest(ConferenceActionTypes.POST_CONFERENCE_ROOM_REQUEST, (action: ConferenceAction) => postConferenceRoomData(action.data as ConferenceRequest));
    yield takeLatest(ConferenceActionTypes.POST_CONFERENCE_ROOM_BOOK_REQUEST, (action: ConferenceAction) => postConferenceRoomBookData(action.data as ConferenceRequest));
}

export default authWatcher;
