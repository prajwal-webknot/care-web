import { put, takeLatest } from "redux-saga/effects";
import {
  NewRegistrationsActions,
  NewRegistrationsAction,
  NewRegistrationsActionTypes,
} from "../actions/NewRegistrationsAction";
import NewRegistrationsService from "../../service/NewRegistrationsService";
import { NewRegistrationsRequest, NewRegistrationsResponse } from "../../../../tsModels/NewRegistrations.data";

function* getNewRegistrationsData(payload: NewRegistrationsRequest): IterableIterator<any> {

  try {
    const response: undefined | NewRegistrationsResponse = yield NewRegistrationsService.newRegistrations(payload);
    yield put(NewRegistrationsActions.newRegistrationsSuccess(response as any));
  } catch (error) {
    yield put(NewRegistrationsActions.newRegistrationsFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(NewRegistrationsActionTypes.NEW_REGISTRATIONS_REQUEST, (action: NewRegistrationsAction) => getNewRegistrationsData(action.data as NewRegistrationsRequest));
}

export default authWatcher;
