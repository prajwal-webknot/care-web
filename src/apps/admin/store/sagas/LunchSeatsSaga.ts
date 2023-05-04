import { put, takeLatest } from "redux-saga/effects";
import {
  LunchSeatsAction,
  LunchSeatsActionTypes,
  LunchSeatsActions,
} from "../actions/LunchSeatsAction";
import LunchSeatsService from "../../service/LunchSeatsService";
import {
  LunchSeatsRequest,
  LunchSeatsResponse,
  EditCafeRequest,
  EditCafeResponse,
} from "../../../../tsModels/LunchSeats.data";

function* getLunchSeatsData(payload: LunchSeatsRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | LunchSeatsResponse = yield LunchSeatsService.LunchSeats(payload);
    yield put(LunchSeatsActions.getLunchSeatsSuccess(response as any));
  } catch (error) {
    yield put(LunchSeatsActions.getLunchSeatsFailure(error));
  }
}
function* patchCafeRequest(payload: EditCafeRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | EditCafeResponse = yield LunchSeatsService.patchLunchCafe(payload);
    yield put(LunchSeatsActions.patchCafeSuccess(response as any));
  } catch (error) {
    yield put(LunchSeatsActions.patchCafeFailure(error));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    LunchSeatsActionTypes.LUNCH_SEATS_REQUEST,
    (action: LunchSeatsAction) =>
      getLunchSeatsData(action.data as LunchSeatsRequest)
  );
  yield takeLatest(
    LunchSeatsActionTypes.PATCH_LUNCH_SEAT_REQUEST,
    (action: LunchSeatsAction) =>
      patchCafeRequest(action.data as EditCafeRequest)
  );
}

export default authWatcher;
