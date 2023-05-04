import {
  HotDeskingRequest,
  HotDeskingResponse,
  EditHotDeskingRequest,
  EditHotDeskingResponse,
} from "../../../../tsModels/HotDesking.data";

export enum HotDeskingActionTypes {
  HOT_DESKING_REQUEST = "HOT_DESKING_REQUEST",
  HOT_DESKING_SUCCESS = "HOT_DESKING_SUCCESS",
  HOT_DESKING_ERROR = "HOT_DESKING_ERROR",
  PATCH_HOT_DESKING_REQUEST = "PATCH_HOT_DESKING_REQUEST",
  PATCH_HOT_DESKING_SUCCESS = "PATCH_HOT_DESKING_SUCCESS",
  PATCH_HOT_DESKING_ERROR = "PATCH_HOT_DESKING_ERROR",
  GET_AVAILABLE_SEATS_REQUEST = "GET_AVAILABLE_SEATS_REQUEST",
  GET_AVAILABLE_SEATS_SUCCESS = "GET_AVAILABLE_SEATS_SUCCESS",
  GET_AVAILABLE_SEATS_ERROR = "GET_AVAILABLE_SEATS_ERROR",
}

export interface HotDeskingAction {
  type: HotDeskingActionTypes;
  data: HotDeskingRequest | HotDeskingResponse | Error;
}
export interface patchHotDeskingAction {
  type: HotDeskingActionTypes;
  data?: EditHotDeskingRequest | EditHotDeskingResponse | Error;
}

export class HotDeskingActions {
  public static getHotDeskingRequest(
    request: HotDeskingRequest
  ): HotDeskingAction {
    return { type: HotDeskingActionTypes.HOT_DESKING_REQUEST, data: request };
  }
  public static getHotDeskingSuccess(
    request: HotDeskingRequest
  ): HotDeskingAction {
    return { type: HotDeskingActionTypes.HOT_DESKING_SUCCESS, data: request };
  }
  public static getHotDeskingFailure(error: Error): HotDeskingAction {
    return { type: HotDeskingActionTypes.HOT_DESKING_ERROR, data: error };
  }
  public static getAvailableSeatsRequest(
    request: HotDeskingRequest
  ): HotDeskingAction {
    return { type: HotDeskingActionTypes.GET_AVAILABLE_SEATS_REQUEST, data: request };
  }
  public static getAvailableSeatsSuccess(
    request: HotDeskingRequest
  ): HotDeskingAction {
    return { type: HotDeskingActionTypes.GET_AVAILABLE_SEATS_SUCCESS, data: request };
  }
  public static getAvailableSeatsFailure(error: Error): HotDeskingAction {
    return { type: HotDeskingActionTypes.GET_AVAILABLE_SEATS_ERROR, data: error };
  }
  public static patchHotDeskRequest(
    request: EditHotDeskingRequest
  ): patchHotDeskingAction {
    return {
      type: HotDeskingActionTypes.PATCH_HOT_DESKING_REQUEST,
      data: request,
    };
  }
  public static patchHotDeskSuccess(
    request: EditHotDeskingRequest
  ): patchHotDeskingAction {
    return {
      type: HotDeskingActionTypes.PATCH_HOT_DESKING_SUCCESS,
      data: request,
    };
  }
  public static patchHotDeskFailure(error: Error): patchHotDeskingAction {
    return { type: HotDeskingActionTypes.PATCH_HOT_DESKING_ERROR, data: error };
  }
}
