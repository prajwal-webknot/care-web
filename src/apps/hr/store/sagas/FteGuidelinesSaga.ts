import { put, takeLatest } from "redux-saga/effects";
import {
  FteGuidelinesActions,
  GetFteGuidelinesAction,
  SetFteGuidelinesAction,
  FteGuidelinesActionTypes,
} from "../actions/FteGuidelinesAction";
import AuthService from "../../service/FteGuidelinesService";
import {
  GetFteGuidelinesResponse,
  SetFteGuidelinesRequest,
  SetFteGuidelinesResponse
} from "../../../../tsModels/FteGuidelines.data";
import { DynamicQueryPath } from "../../../common/store/ApiConfig.data";

function* getFteGuidelinesData(payload: DynamicQueryPath): IterableIterator<any> {
  try {
    const response: undefined | GetFteGuidelinesResponse = yield AuthService.getFteGuidelines(payload);
    yield put(FteGuidelinesActions.getFteGuidelinesSuccess(response as any));
  } catch (error) {
    yield put(FteGuidelinesActions.getFteGuidelinesFailure(error as any));
  }
}

function* setFteGuidelinesData(payload: SetFteGuidelinesRequest): IterableIterator<any> {
  try {
    const response: undefined | SetFteGuidelinesResponse = yield AuthService.setFteGuidelines(payload);
    yield put(FteGuidelinesActions.setFteGuidelinesSuccess(response as any));
  } catch (error) {
    yield put(FteGuidelinesActions.setFteGuidelinesFailure(error as any));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(FteGuidelinesActionTypes.GET_FTE_GUIDELINES_REQUEST, (action: GetFteGuidelinesAction) => getFteGuidelinesData(action.data as DynamicQueryPath));
  yield takeLatest(FteGuidelinesActionTypes.SET_FTE_GUIDELINES_REQUEST, (action: SetFteGuidelinesAction) => setFteGuidelinesData(action.data as SetFteGuidelinesRequest));
}

export default authWatcher;
