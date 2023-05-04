import { put, takeLatest } from "redux-saga/effects";
import {
  ExpectedVisitorsAction,
  ExpectedVisitorsActionTypes,
  ExpectedVisitorsActions
} from "../actions/ExpectedVisitorsAction";
import ExpectedVisitorsService from "../../service/ExpectedVisitorsService";
import { EditExpectedVisitorsRequest, EditExpectedVisitorsResponse, ExpectedVisitorsRequest, ExpectedVisitorsResponse } from "../../../../tsModels/ExpectedVisitors.data";

function* getExpectedVisitorsData(payload: ExpectedVisitorsRequest): IterableIterator<any> {

  try {
    const response: undefined | ExpectedVisitorsResponse = yield ExpectedVisitorsService.expectedVisitors(payload);
    yield put(ExpectedVisitorsActions.getExpectedVisitorsSuccess(response as any));
  } catch (error) {
    yield put(ExpectedVisitorsActions.getExpectedVisitorsFailure(error as any));
  }
}
function* patchHotDeskRequest(
  payload: EditExpectedVisitorsRequest
): IterableIterator<any> {
  try {
    const response:
      | undefined
      | EditExpectedVisitorsResponse = yield ExpectedVisitorsService.editExpectedVisitors(
        payload
      );
    yield put(ExpectedVisitorsActions.editExpectedVisitorSuccess(response as any));
  } catch (error) {
    yield put(ExpectedVisitorsActions.editExpectedVisitorFailure(error as any));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    ExpectedVisitorsActionTypes.EXPECTED_VISITORS_EDIT_REQUEST,
    (action: ExpectedVisitorsAction) =>
      patchHotDeskRequest(action.data as EditExpectedVisitorsRequest)
  );
  yield takeLatest(ExpectedVisitorsActionTypes.EXPECTED_VISITORS_REQUEST, (action: ExpectedVisitorsAction) => getExpectedVisitorsData(action.data as ExpectedVisitorsRequest));
}

export default authWatcher;
