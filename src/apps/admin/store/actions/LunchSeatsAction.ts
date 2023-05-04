import {
  LunchSeatsRequest,
  LunchSeatsResponse,
  EditCafeRequest,
  EditCafeResponse,
} from "../../../../tsModels/LunchSeats.data";

export enum LunchSeatsActionTypes {
  LUNCH_SEATS_REQUEST = "LUNCH_SEATS_REQUEST",
  LUNCH_SEATS_SUCCESS = "LUNCH_SEATS_SUCCESS",
  LUNCH_SEATS_ERROR = "LUNCH_SEATS_ERROR",
  PATCH_LUNCH_SEAT_REQUEST = "PATCH_LUNCH_SEAT_REQUEST",
  PATCH_LUNCH_SEAT_SUCCESS = "PATCH_LUNCH_SEAT_SUCCESS",
  PATCH_LUNCH_SEAT_ERROR = "PATCH_LUNCH_SEAT_ERROR",
}

export interface LunchSeatsAction {
  type: LunchSeatsActionTypes;
  data: LunchSeatsRequest | LunchSeatsResponse | Error;
}
export interface patchLunchSeatAction {
  type: LunchSeatsActionTypes;
  data?: EditCafeRequest | EditCafeResponse | Error;
}

export class LunchSeatsActions {
  public static getLunchSeatsRequest(
    request: LunchSeatsRequest
  ): LunchSeatsAction {
    return { type: LunchSeatsActionTypes.LUNCH_SEATS_REQUEST, data: request };
  }
  public static getLunchSeatsSuccess(
    request: LunchSeatsRequest
  ): LunchSeatsAction {
    return { type: LunchSeatsActionTypes.LUNCH_SEATS_SUCCESS, data: request };
  }
  public static getLunchSeatsFailure(error: Error): LunchSeatsAction {
    return { type: LunchSeatsActionTypes.LUNCH_SEATS_ERROR, data: error };
  }
  public static patchCafeRequest(
    request: EditCafeRequest
  ): patchLunchSeatAction {
    return {
      type: LunchSeatsActionTypes.PATCH_LUNCH_SEAT_REQUEST,
      data: request,
    };
  }
  public static patchCafeSuccess(
    request: EditCafeRequest
  ): patchLunchSeatAction {
    return {
      type: LunchSeatsActionTypes.PATCH_LUNCH_SEAT_SUCCESS,
      data: request,
    };
  }
  public static patchCafeFailure(error: Error): patchLunchSeatAction {
    return { type: LunchSeatsActionTypes.PATCH_LUNCH_SEAT_ERROR, data: error };
  }
}
