import { put, takeLatest } from "redux-saga/effects";
import {
  TempVisitorActions,
  TempVisitorAction,
  PostTempVisitorActionTypes
} from "../actions/TempVisitorAction";
import TempVisitorService from "../../service/TempVisitorService";
import { PostTempVisitorRequest, PostTempVisitorResponse } from "../../../../tsModels/TempVisitor.data";


function* postTempVisitorData(payload: PostTempVisitorRequest): IterableIterator<any> {
  try {
    const response: undefined | PostTempVisitorResponse = yield TempVisitorService.postVisitor(payload);
    yield put(TempVisitorActions.postTempVisitorSuccess(response as any));
  } catch (error) {
    yield put(TempVisitorActions.postTempVisitorFailure(error));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(PostTempVisitorActionTypes.POST_TEMPVISITOR_REQUEST, (action: TempVisitorAction) => postTempVisitorData(action.data as PostTempVisitorRequest));
}

export default authWatcher;