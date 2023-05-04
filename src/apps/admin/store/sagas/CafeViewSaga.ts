import { put, takeLatest } from "redux-saga/effects";
import {
  CafeViewAction,
  CafeViewActionTypes,
  CafeViewActions,
} from "../actions/CafeViewActions";
import CafeViewService from "../../service/CafeViewService";
import {
  CafeViewRequest,
  CafeViewResponse,
} from "../../../../tsModels/CafeView.data";

function* getCafeView(payload: CafeViewRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | CafeViewResponse = yield CafeViewService.CafeSlots(payload);
    yield put(CafeViewActions.getCafeViewSuccess(response as any));
  } catch (error) {
    yield put(CafeViewActions.getCafeViewFailure(error as any));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    CafeViewActionTypes.CAFE_VIEW_REQUEST,
    (action: CafeViewAction) => getCafeView(action.data as CafeViewRequest)
  );
}

export default authWatcher;
