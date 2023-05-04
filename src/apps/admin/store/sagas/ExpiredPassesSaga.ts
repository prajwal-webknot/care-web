import { put, takeLatest } from "redux-saga/effects";
import {
 ExpiredPassesAction, 
 ExpiredPassesActionTypes,
 ExpiredPassesActions
} from "../actions/ExpiredPassesAction";
import AuthService from "../../service/ExpiredPassesService";
import { ExpiredPassesRequest, ExpiredPassesResponse } from "../../../../tsModels/ExpiredPasses.data";

function* getExpiredPassesData(payload: ExpiredPassesRequest): IterableIterator<any> {
  
  try {
    const response: undefined | ExpiredPassesResponse = yield AuthService.ExpiredPasses(payload);
    yield put(ExpiredPassesActions.getExpiredPassesSuccess(response as any));
  } catch (error) {
    yield put(ExpiredPassesActions.getExpiredPassesFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(ExpiredPassesActionTypes.EXPIRED_PASSES_REQUEST, (action: ExpiredPassesAction) => getExpiredPassesData(action.data as ExpiredPassesRequest));
}

export default authWatcher;
