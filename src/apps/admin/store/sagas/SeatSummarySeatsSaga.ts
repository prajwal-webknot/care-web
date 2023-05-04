import { put, takeLatest } from "redux-saga/effects";
import {
  SeatSummarySeatsAction,
  SeatSummarySeatsActionTypes,
  SeatSummarySeatsActions,
} from "../actions/SeatSummarySeatsAction";
import SeatSummarySeatsService from "../../service/SeatSummarySeatsService";
import {
  SeatSummarySeatsRequest,
  SeatSummarySeatsResponse,
  EditSeatSummarySeatRequest,
  EditSeatSummarySeatResponse
} from "../../../../tsModels/SeatSummarySeats.data";

function* getSeatSummarySeats(payload: SeatSummarySeatsRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | SeatSummarySeatsResponse = yield SeatSummarySeatsService.SeatSummarySeats(payload);
    yield put(SeatSummarySeatsActions.getSeatSummarySeatsSuccess(response as any));
  } catch (error) {
    yield put(SeatSummarySeatsActions.getSeatSummarySeatsFailure(error));
  }
}
function* patchSeatSummaryRequest(
  payload: EditSeatSummarySeatRequest
): IterableIterator<any> {
  try {
    const response:
      | undefined
      | EditSeatSummarySeatResponse = yield SeatSummarySeatsService.patchSeatSummary(
      payload
    );
    yield put(SeatSummarySeatsActions.patchSeatSummarySuccess(response as any));
  } catch (error) {
    yield put(SeatSummarySeatsActions.patchSeatSummaryFailure(error));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    SeatSummarySeatsActionTypes.SEAT_SUMMARY_SEATS_REQUEST,
    (action: SeatSummarySeatsAction) =>
    getSeatSummarySeats(action.data as SeatSummarySeatsRequest)
  );
  yield takeLatest(
    SeatSummarySeatsActionTypes.PATCH_SEAT_SUMMARY_REQUEST,
    (action: SeatSummarySeatsAction) =>
    patchSeatSummaryRequest(action.data as EditSeatSummarySeatRequest)
  );
}

export default authWatcher;
