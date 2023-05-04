import {
  PostTempVisitorRequest,
  PostTempVisitorResponse,
} from "../../../../tsModels/TempVisitor.data";

export enum PostTempVisitorActionTypes {
  POST_TEMPVISITOR_REQUEST = "POST_TEMPVISITOR_REQUEST",
  POST_TEMPVISITOR_SUCCESS = "POST_TEMPVISITOR_SUCCESS",
  POST_TEMPVISITOR_ERROR = "POST_TEMPVISITOR_ERROR",
}

export interface TempVisitorAction {
  type: PostTempVisitorActionTypes;
  data: PostTempVisitorRequest | PostTempVisitorResponse;
}

export class TempVisitorActions {
  public static postTempVisitorRequest(
    request: PostTempVisitorRequest
  ): TempVisitorAction {
    return {
      type: PostTempVisitorActionTypes.POST_TEMPVISITOR_REQUEST,
      data: request,
    };
  }
  public static postTempVisitorSuccess(
    request: PostTempVisitorRequest
  ): TempVisitorAction {
    return {
      type: PostTempVisitorActionTypes.POST_TEMPVISITOR_SUCCESS,
      data: request,
    };
  }
  public static postTempVisitorFailure(error: Error): TempVisitorAction {
    return {
      type: PostTempVisitorActionTypes.POST_TEMPVISITOR_ERROR,
      data: error,
    };
  }
}
