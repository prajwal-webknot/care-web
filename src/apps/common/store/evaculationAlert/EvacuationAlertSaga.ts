import { put, takeLatest } from "redux-saga/effects";
import {
 EvacuationAlertAction, 
 EvacuationAlertActionTypes,
 EvacuationAlertActions
} from "./EvacuationAlertAction";
import AuthService from "./EvacuationAlertService";
import { EvacuationAlertRequest, EvacuationAlertResponse } from "../../../../tsModels/EvacuationAlert.data";

function* sendEvacuationAlert(payload: EvacuationAlertRequest): IterableIterator<any> {
  
  try {
    const response: undefined | EvacuationAlertResponse = yield AuthService.EvacuationAlert(payload);
    yield put(EvacuationAlertActions.sendEvacuationAlertSuccess(response as any));
  } catch (error) {
    yield put(EvacuationAlertActions.sendEvacuationAlertFailure(error));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(EvacuationAlertActionTypes.EVACUATION_ALERT_REQUEST, (action: EvacuationAlertAction) => sendEvacuationAlert(action.data as EvacuationAlertRequest));
}

export default authWatcher;
