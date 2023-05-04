import { put, takeLatest } from "redux-saga/effects";
import {
  RosterActions,
  RosterAction,
  RosterActionTypes,
} from "../actions/RosterAction";
import AuthService from "../../service/RosterService";
import { RosterRequest, RosterResponse } from "../../../../tsModels/Roster.data";

function* getRosterData(payload: RosterRequest): IterableIterator<any> {
  try {
    const response: undefined | RosterResponse = yield AuthService.getRoster(payload);
    yield put(RosterActions.getRosterSuccess(response as any));
  } catch (error) {
    yield put(RosterActions.getRosterFailure(error as any));
  }
}
function* postRosterData(payload: RosterRequest): IterableIterator<any> {
  try {
    const response: undefined | RosterResponse = yield AuthService.postRoster(payload);
    yield put(RosterActions.postRosterSuccess(response as any));
  } catch (error) {
    yield put(RosterActions.postRosterFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(RosterActionTypes.GET_ROSTER_REQUEST, (action: RosterAction) => getRosterData(action.data as RosterRequest));
  yield takeLatest(RosterActionTypes.POST_ROSTER_REQUEST, (action: RosterAction) => postRosterData(action.data as RosterRequest));
}

export default authWatcher;
