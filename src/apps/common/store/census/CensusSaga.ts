import { put, takeLatest } from "redux-saga/effects";
import {
  CensusActions,
  CensusAction,
  CensusActionTypes,
} from "./CensusAction";
import CensusService from "./CensusService";
import { CensusRequest, CensusResponse } from "../../../../tsModels/Census.data";

function* getCensusData(payload: CensusRequest): IterableIterator<any> {
  
  try {
    const response: undefined | CensusResponse = yield CensusService.census(payload);
    yield put(CensusActions.censusSuccess(response as any));
  } catch (error) {
    yield put(CensusActions.censusFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(CensusActionTypes.CENSUS_REQUEST, (action: CensusAction) => getCensusData(action.data as CensusRequest));
}

export default authWatcher;
