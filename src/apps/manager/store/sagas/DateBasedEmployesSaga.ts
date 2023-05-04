import { put, takeLatest } from "redux-saga/effects";
import { DateBasedEmployesRequest, DateBasedEmployesResponse } from "../../../../tsModels/DateBasedEmployes.data";

import AuthService from "../../service/DatebasedEmployesService";
import { DateBasedEmployesAction, DateBasedEmployesActions, DateBasedEmployesActionTypes } from "../actions/DateBasedEmployesAction";

function* DateBasedEmployesSaga(payload: DateBasedEmployesRequest): IterableIterator<any> {
    try {
        const response: undefined | DateBasedEmployesResponse = yield AuthService.getDateBasedEmployes(payload);
        yield put(DateBasedEmployesActions.DateBasedEmployesSuccess(response as any));
    } catch (error) {
        yield put(DateBasedEmployesActions.DateBasedEmployesFailure(error as any));
    }
}



function* authWatcher(): IterableIterator<any> {
    yield takeLatest(DateBasedEmployesActionTypes.DATE_BASED_EMPLOYES_REQUEST, (action: DateBasedEmployesAction) => DateBasedEmployesSaga(action.data as DateBasedEmployesRequest));
}

export default authWatcher;
