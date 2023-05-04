import { put, takeLatest } from "redux-saga/effects";
import {
  EntrySurveyActions,
  EntrySurveyAction,
  EntrySurveyActionTypes,
  PostSurveyActionTypes,
} from "../actions/EntrySurveyAction";
import EntrySurveyService from "../../service/EntrySurveyService";
import { EntrySurveyRequest, EntrySurveyResponse, PostSurveyRequest, PostSurveyResponse } from "../../../../tsModels/EntrySurvey.data";

function* getEntrySurveyData(payload: EntrySurveyRequest): IterableIterator<any> {
  try {
    const response: undefined | EntrySurveyResponse = yield EntrySurveyService.survey(payload);
    yield put(EntrySurveyActions.entrySurveySuccess(response as any));
  } catch (error) {
    yield put(EntrySurveyActions.entrySurveyFailure(error as any));
  }
}
function* postEntrySurveyData(payload: PostSurveyRequest): IterableIterator<any> {
  try {
    const response: undefined | PostSurveyResponse = yield EntrySurveyService.postSurvey(payload);
    yield put(EntrySurveyActions.postSurveySuccess(response as any));
  } catch (error) {
    yield put(EntrySurveyActions.postSurveyFailure(error as any));
  }
}


function* authWatcher(): IterableIterator<any> {
  yield takeLatest(EntrySurveyActionTypes.ENTRY_SURVEY_REQUEST, (action: EntrySurveyAction) => getEntrySurveyData(action.data as EntrySurveyRequest));
  yield takeLatest(PostSurveyActionTypes.POST_SURVEY_REQUEST, (action: EntrySurveyAction) => postEntrySurveyData(action.data as PostSurveyRequest));
}

export default authWatcher;
