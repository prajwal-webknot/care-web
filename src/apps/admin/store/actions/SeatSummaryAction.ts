import {
  SeatSummaryRequest,
  SeatSummaryResponse,
} from "../../../../tsModels/SeatSummary.data";

export enum SeatSummaryActionTypes {
  SEAT_SUMMARY_REQUEST = "SEAT_SUMMARY_REQUEST",
  SEAT_SUMMARY_SUCCESS = "SEAT_SUMMARY_SUCCESS",
  SEAT_SUMMARY_ERROR = "SEAT_SUMMARY_ERROR",
}

export interface SeatSummaryAction {
  type: SeatSummaryActionTypes;
  data: SeatSummaryRequest | SeatSummaryResponse | Error;
}

export class SeatSummaryActions {
  public static getSeatSummaryRequest(
    request: SeatSummaryRequest
  ): SeatSummaryAction {
    return { type: SeatSummaryActionTypes.SEAT_SUMMARY_REQUEST, data: request };
  }
  public static getSeatSummarySuccess(
    request: SeatSummaryRequest
  ): SeatSummaryAction {
    return { type: SeatSummaryActionTypes.SEAT_SUMMARY_SUCCESS, data: request };
  }
  public static getSeatSummaryFailure(error: Error): SeatSummaryAction {
    return { type: SeatSummaryActionTypes.SEAT_SUMMARY_ERROR, data: error };
  }
}
