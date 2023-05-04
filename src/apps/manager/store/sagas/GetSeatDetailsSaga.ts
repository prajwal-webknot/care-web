import { put, takeLatest } from "redux-saga/effects";
import { GetSeatDetailsRequest, GetSeatDetailsResponse } from "../../../../tsModels/GetSeatDetails.data";

import AuthService from "../../service/GetSeatDetails";
import { GetSeatDetailsAction, GetSeatDetailsActions, GetSeatDetailsActionTypes } from "../actions/GetSeatDetailsAction";

function* GetSeatDetails(payload: GetSeatDetailsRequest): IterableIterator<any> {
    try {
        const response: undefined | GetSeatDetailsResponse = yield AuthService.getSeatDetails(payload);
        yield put(GetSeatDetailsActions.GetSeatDetailsSuccess(response as any));
    } catch (error) {
        yield put(GetSeatDetailsActions.GetSeatDetailsFailure(error as any));
    }
}



function* authWatcher(): IterableIterator<any> {
    yield takeLatest(GetSeatDetailsActionTypes.GET_SEAT_DETAILS_REQUEST, (action: GetSeatDetailsAction) => GetSeatDetails(action.data as GetSeatDetailsRequest));
}

export default authWatcher;
