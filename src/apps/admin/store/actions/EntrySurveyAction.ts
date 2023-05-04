
import { EntrySurveyRequest, EntrySurveyResponse, PostSurveyRequest, PostSurveyResponse } from '../../../../tsModels/EntrySurvey.data';

export enum EntrySurveyActionTypes {
  ENTRY_SURVEY_REQUEST = "ENTRY_SURVEY_REQUEST",
  ENTRY_SURVEY_SUCCESS = "ENTRY_SURVEY_SUCCESS",
  ENTRY_SURVEY_ERROR = "ENTRY_SURVEY_ERROR",
}
export enum PostSurveyActionTypes {
  POST_SURVEY_REQUEST = "POST_SURVEY_REQUEST",
  POST_SURVEY_SUCCESS = "POST_SURVEY_SUCCESS",
  POST_SURVEY_ERROR = "POST_SURVEY_ERROR",
}

export interface EntrySurveyAction {
  type: EntrySurveyActionTypes | PostSurveyActionTypes,
  data: EntrySurveyRequest | EntrySurveyResponse | PostSurveyRequest | PostSurveyResponse;
}

export class EntrySurveyActions {
  public static entrySurveyRequest(request: EntrySurveyRequest): EntrySurveyAction {
    return { type: EntrySurveyActionTypes.ENTRY_SURVEY_REQUEST, data: request };
  }
  public static entrySurveySuccess(request: EntrySurveyRequest): EntrySurveyAction {
    return { type: EntrySurveyActionTypes.ENTRY_SURVEY_SUCCESS, data: request };
  }
  public static entrySurveyFailure(error: Error): EntrySurveyAction {
    return { type: EntrySurveyActionTypes.ENTRY_SURVEY_ERROR, data: error };
  }
  public static postSurveyRequest(request: EntrySurveyRequest): EntrySurveyAction {
    return { type: PostSurveyActionTypes.POST_SURVEY_REQUEST, data: request };
  }
  public static postSurveySuccess(request: EntrySurveyRequest): EntrySurveyAction {
    return { type: PostSurveyActionTypes.POST_SURVEY_SUCCESS, data: request };
  }
  public static postSurveyFailure(error: Error): EntrySurveyAction {
    return { type: PostSurveyActionTypes.POST_SURVEY_ERROR, data: error };
  }
}

