import { put, takeLatest } from "redux-saga/effects";
import {
 EmergencyDetailsAction, 
 EmergencyDetailsActionTypes,
 EmergencyDetailsActions
} from "../actions/EmergencyDetailsAction";
import AuthService from "../../service/EmergencyDetailsService";
import { EmergencyDetailsRequest, EmergencyDetailsResponse } from "../../../../tsModels/EmergencyDetails.data";

function* getEmergencyDetailsData(payload: EmergencyDetailsRequest): IterableIterator<any> {
  
  try {
    const response: undefined | EmergencyDetailsResponse = yield AuthService.EmergencyDetails(payload);
    yield put(EmergencyDetailsActions.getEmergencyDetailsSuccess(response as any));
  } catch (error) {
    yield put(EmergencyDetailsActions.getEmergencyDetailsFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(EmergencyDetailsActionTypes.EMERGENCY_DETAILS_REQUEST, (action: EmergencyDetailsAction) => getEmergencyDetailsData(action.data as EmergencyDetailsRequest));
}

export default authWatcher;
