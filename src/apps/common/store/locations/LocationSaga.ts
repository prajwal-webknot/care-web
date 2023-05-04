import { put, takeLatest } from "redux-saga/effects";
import {
  LocationAction,
  LocationActions,
  LocationActionTypes,
} from "./LocationActions";
import LocationService from "./LocationService";
import { LocationRequest, LocationResponse } from "./Location.data";

function* locations(payload: LocationRequest): IterableIterator<any> {

  try {
    const response: undefined | LocationResponse = yield LocationService.getLocations(payload);
    yield put(LocationActions.locationSuccess(response as any));
  } catch (error) {
    yield put(LocationActions.locationFailure(error as any));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(LocationActionTypes.LOCATION_REQUEST, (action: LocationAction) => locations(action.data as LocationRequest));
}

export default authWatcher;
