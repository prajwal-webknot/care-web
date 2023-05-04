import { put, takeLatest } from "redux-saga/effects";
import { SearchEmployRequest, SearchEmployResponse } from "../../../../tsModels/SearchEmploy.data";

import AuthService from "../../service/SearchEmployService";
import { SearchEmployAction, SearchEmployActions, SearchEmployActionTypes } from "../actions/SearchEmployAction";

function* SearchEmploy(payload: SearchEmployRequest): IterableIterator<any> {
    try {
        const response: undefined | SearchEmployResponse = yield AuthService.getRoster(payload);
        yield put(SearchEmployActions.searchEmploySuccess(response as any));
    } catch (error) {
        yield put(SearchEmployActions.searchEmployFailure(error as any));
    }
}



function* authWatcher(): IterableIterator<any> {
    yield takeLatest(SearchEmployActionTypes.SEARCH_EMPLOY_REQUEST, (action: SearchEmployAction) => SearchEmploy(action.data as SearchEmployRequest));
}

export default authWatcher;
