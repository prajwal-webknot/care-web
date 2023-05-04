import { put, takeLatest } from "redux-saga/effects";
import {
    RosterGuestActions,
    RosterGuestAction,
    RosterGuestActionTypes,
} from "../actions/RosterGuestAction";
import AuthService from "../../service/RosterGuestService";
import { RosterGuestRequest, RosterGuestResponse } from "../../../../tsModels/RosterGuest.data";


function* postRosterGuestData(payload: RosterGuestRequest): IterableIterator<any> {
    try {
        const response: undefined | RosterGuestResponse = yield AuthService.postRosterGuest(payload);
        yield put(RosterGuestActions.postRosterGuestSuccess(response as any));
    } catch (error) {
        yield put(RosterGuestActions.postRosterGuestFailure(error as any));
    }
}


function* authWatcher(): IterableIterator<any> {
    yield takeLatest(RosterGuestActionTypes.POST_ROSTER_GUEST_REQUEST, (action: RosterGuestAction) => postRosterGuestData(action.data as RosterGuestRequest));
}

export default authWatcher;
