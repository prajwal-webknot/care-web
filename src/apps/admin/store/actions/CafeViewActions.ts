import {
  CafeViewRequest,
  CafeViewResponse,
} from "../../../../tsModels/CafeView.data";

export enum CafeViewActionTypes {
  CAFE_VIEW_REQUEST = "CAFE_VIEW_REQUEST",
  CAFE_VIEW_SUCCESS = "CAFE_VIEW_SUCCESS",
  CAFE_VIEW_ERROR = "CAFE_VIEW_ERROR",
  CAFE_VIEW_DATA = "CAFE_VIEW_DATA",
}

export interface CafeViewAction {
  type: CafeViewActionTypes;
  data: CafeViewRequest | CafeViewResponse | Error;
}

export class CafeViewActions {
  public static getCafeViewRequest(request: CafeViewRequest): CafeViewAction {
    return { type: CafeViewActionTypes.CAFE_VIEW_REQUEST, data: request };
  }
  public static getCafeViewSuccess(request: CafeViewRequest): CafeViewAction {
    return { type: CafeViewActionTypes.CAFE_VIEW_SUCCESS, data: request };
  }
  public static getCafeViewFailure(error: Error): CafeViewAction {
    return { type: CafeViewActionTypes.CAFE_VIEW_ERROR, data: error };
  }
}
