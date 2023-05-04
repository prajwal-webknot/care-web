import { createSelector } from 'reselect';
import { EntrySurveyAction, EntrySurveyActionTypes, PostSurveyActionTypes } from '../actions/EntrySurveyAction';
import { EntrySurveyRequest, EntrySurveyResponse } from "../../../../tsModels/EntrySurvey.data";

export interface EntrySurveyState {
  isFetching: boolean,
  error: boolean | object,
  data: EntrySurveyResponse | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function EntrySurveyReducer(state = initialState, action: EntrySurveyAction): EntrySurveyState {
  switch (action.type) {
    case EntrySurveyActionTypes.ENTRY_SURVEY_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case EntrySurveyActionTypes.ENTRY_SURVEY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case EntrySurveyActionTypes.ENTRY_SURVEY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
    case PostSurveyActionTypes.POST_SURVEY_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case PostSurveyActionTypes.POST_SURVEY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case PostSurveyActionTypes.POST_SURVEY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
    default:
      return state;
  }
}

const entrySurveySelector = (store: { entrySurvey: EntrySurveyState; }) => store.entrySurvey;

export const entrySurveyResponse = createSelector(entrySurveySelector, (state) => state.data);
