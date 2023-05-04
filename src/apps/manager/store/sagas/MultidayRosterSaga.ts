import { put, takeLatest } from 'redux-saga/effects';
import { MultidayRosterRequest, MultidayRosterResponse } from '../../../../tsModels/MultidayRoster.data';
import AuthService from '../../service/MultidayRosterService';
import {
    MultidayRosterActions,
    MultidayRosterActionTypes,
    MultidayRosterAction,
} from '../actions/MultidayRosterAction';

function* postMultidayRosterData(payload: MultidayRosterRequest): IterableIterator<any> {
    try {
        const response: undefined | MultidayRosterResponse = yield AuthService.postRoster(payload);
        yield put(MultidayRosterActions.postRosterSuccess(response as any));
    } catch (error) {
        yield put(MultidayRosterActions.postRosterFailure(error));
    }
}

function* authWatcher(): IterableIterator<any> {
    yield takeLatest(MultidayRosterActionTypes.POST_MULTIDAY_ROSTER_REQUEST, (action: MultidayRosterAction) =>
        postMultidayRosterData(action.data as MultidayRosterRequest),
    );
}

export default authWatcher;
