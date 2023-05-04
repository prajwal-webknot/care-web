
import { ExpectedVisitorsRequest, ExpectedVisitorsResponse } from '../../../../tsModels/ExpectedVisitors.data';

export enum ExpectedVisitorsActionTypes {
  EXPECTED_VISITORS_REQUEST = "EXPECTED_VISITORS_REQUEST",
  EXPECTED_VISITORS_SUCCESS = "EXPECTED_VISITORS_SUCCESS",
  EXPECTED_VISITORS_ERROR = "EXPECTED_VISITORS_ERROR",
  EXPECTED_VISITORS_EDIT_REQUEST = "EXPECTED_VISITORS_EDIT_REQUEST",
  EXPECTED_VISITORS_EDIT_SUCCESS = "EXPECTED_VISITORS_EDIT_SUCCESS",
  EXPECTED_VISITORS_EDIT_ERROR = "EXPECTED_VISITORS_EDIT_ERROR",
}

export interface ExpectedVisitorsAction {
  type: ExpectedVisitorsActionTypes,
  data: ExpectedVisitorsRequest | ExpectedVisitorsResponse | Error;
}

export class ExpectedVisitorsActions {
  public static getExpectedVisitorsRequest(request: ExpectedVisitorsRequest): ExpectedVisitorsAction {
    return { type: ExpectedVisitorsActionTypes.EXPECTED_VISITORS_REQUEST, data: request }
  }
  public static getExpectedVisitorsSuccess(request: ExpectedVisitorsRequest): ExpectedVisitorsAction {
    return { type: ExpectedVisitorsActionTypes.EXPECTED_VISITORS_SUCCESS, data: request }
  }
  public static getExpectedVisitorsFailure(error: Error): ExpectedVisitorsAction {
    return { type: ExpectedVisitorsActionTypes.EXPECTED_VISITORS_ERROR, data: error }
  }
  public static editExpectedVisitorRequest(
    request: ExpectedVisitorsRequest
  ): ExpectedVisitorsAction {
    return {
      type: ExpectedVisitorsActionTypes.EXPECTED_VISITORS_EDIT_REQUEST,
      data: request,
    };
  }
  public static editExpectedVisitorSuccess(
    request: ExpectedVisitorsRequest
  ): ExpectedVisitorsAction {
    return {
      type: ExpectedVisitorsActionTypes.EXPECTED_VISITORS_EDIT_SUCCESS,
      data: request,
    };
  }
  public static editExpectedVisitorFailure(error: Error): ExpectedVisitorsAction {
    return { type: ExpectedVisitorsActionTypes.EXPECTED_VISITORS_EDIT_ERROR, data: error };
  }
}


