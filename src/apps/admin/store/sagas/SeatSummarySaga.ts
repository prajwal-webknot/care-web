import { put, takeLatest } from "redux-saga/effects";
import {
  SeatSummaryAction,
  SeatSummaryActionTypes,
  SeatSummaryActions,
} from "../actions/SeatSummaryAction";
import SeatSummaryService from "../../service/SeatSummaryService";
import {
  SeatSummaryRequest,
  SeatSummaryResponse,
} from "../../../../tsModels/SeatSummary.data";

function* getSeatSummary(payload: SeatSummaryRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | SeatSummaryResponse = yield SeatSummaryService.SeatSummary(payload);
    yield put(SeatSummaryActions.getSeatSummarySuccess(response as any));
  } catch (error) {
    yield put(SeatSummaryActions.getSeatSummaryFailure(error));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    SeatSummaryActionTypes.SEAT_SUMMARY_REQUEST,
    (action: SeatSummaryAction) =>
      getSeatSummary(action.data as SeatSummaryRequest)
  );
}

export default authWatcher;
