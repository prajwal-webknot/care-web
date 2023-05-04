import { put, takeLatest } from "redux-saga/effects";
import {
  SafetyBreachesActions,
  SafetyBreachesAction,
  SafetyBreachesActionTypes,
} from "./SafetyBreachesAction";
import SafetyBreachesService from "./SafetyBreachesService";
import { SafetyBreachesRequest, SafetyBreachesResponse } from "../../../../tsModels/SafetyBreaches.data";

function* getSafetyBreachesData(payload: SafetyBreachesRequest): IterableIterator<any> {

  try {
    const response: undefined | SafetyBreachesResponse = yield SafetyBreachesService.safetyBreaches(payload);
    yield put(SafetyBreachesActions.safetyBreachesSuccess(response as any));
  } catch (error) {
    yield put(SafetyBreachesActions.safetyBreachesFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(SafetyBreachesActionTypes.SAFETY_BREACHES_REQUEST, (action: SafetyBreachesAction) => getSafetyBreachesData(action.data as SafetyBreachesRequest));
}

export default authWatcher;
