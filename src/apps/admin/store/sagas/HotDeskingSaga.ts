import { put, takeLatest } from "redux-saga/effects";
import {
  HotDeskingAction,
  HotDeskingActionTypes,
  HotDeskingActions,
} from "../actions/HotDeskingActions";
import HotDeskingService from "../../service/HotDeskingService";
import {
  HotDeskingRequest,
  HotDeskingResponse,
  EditHotDeskingRequest,
  EditHotDeskingResponse,
} from "../../../../tsModels/HotDesking.data";

function* getAvailableSeats(payload: HotDeskingRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | HotDeskingResponse = yield HotDeskingService.getAvailableSeats(payload);
    yield put(HotDeskingActions.getAvailableSeatsSuccess(response as any));
  } catch (error) {
    yield put(HotDeskingActions.getAvailableSeatsFailure(error as any));
  }
}

function* getCafeView(payload: HotDeskingRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | HotDeskingResponse = yield HotDeskingService.getHotDesking(payload);
    yield put(HotDeskingActions.getHotDeskingSuccess(response as any));
  } catch (error) {
    yield put(HotDeskingActions.getHotDeskingFailure(error as any));
  }
}
function* patchHotDeskRequest(
  payload: EditHotDeskingRequest
): IterableIterator<any> {
  try {
    const response:
      | undefined
      | EditHotDeskingResponse = yield HotDeskingService.patchHotDesking(
        payload
      );
    yield put(HotDeskingActions.patchHotDeskSuccess(response as any));
  } catch (error) {
    yield put(HotDeskingActions.patchHotDeskFailure(error as any));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    HotDeskingActionTypes.HOT_DESKING_REQUEST,
    (action: HotDeskingAction) => getCafeView(action.data as HotDeskingRequest)
  );
  yield takeLatest(
    HotDeskingActionTypes.GET_AVAILABLE_SEATS_REQUEST,
    (action: HotDeskingAction) => getAvailableSeats(action.data as HotDeskingRequest)
  );
  yield takeLatest(
    HotDeskingActionTypes.PATCH_HOT_DESKING_REQUEST,
    (action: HotDeskingAction) =>
      patchHotDeskRequest(action.data as EditHotDeskingRequest)
  );
}

export default authWatcher;
