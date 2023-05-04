import { createSelector } from 'reselect';
import { TempVisitorAction, PostTempVisitorActionTypes } from '../actions/TempVisitorAction';
import { PostTempVisitorRequest, PostTempVisitorResponse } from "../../../../tsModels/TempVisitor.data";

export interface TempVisitorState {
  isFetching: boolean,
  error: boolean | object,
  data: PostTempVisitorResponse | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function TempVisitorReducer(state = initialState, action: TempVisitorAction): TempVisitorState {
  switch (action.type) {
    
    case PostTempVisitorActionTypes.POST_TEMPVISITOR_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case PostTempVisitorActionTypes.POST_TEMPVISITOR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case PostTempVisitorActionTypes.POST_TEMPVISITOR_ERROR:
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

const tempVisitorSelector = (store: { tempVisitor: TempVisitorState; }) => store.tempVisitor;

export const tempVisitorResponse = createSelector(tempVisitorSelector, (state) => state);
