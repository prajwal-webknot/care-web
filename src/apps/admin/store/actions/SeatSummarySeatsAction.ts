import {
  SeatSummarySeatsRequest,
  SeatSummarySeatsResponse,
  EditSeatSummarySeatRequest,
  EditSeatSummarySeatResponse,
} from "../../../../tsModels/SeatSummarySeats.data";

export enum SeatSummarySeatsActionTypes {
  SEAT_SUMMARY_SEATS_REQUEST = "SEAT_SUMMARY_SEATS_REQUEST",
  SEAT_SUMMARY_SEATS_SUCCESS = "SEAT_SUMMARY_SEATS_UCCESS",
  SEAT_SUMMARY_SEATS_ERROR = "SEAT_SUMMARY_SEATS_ERROR",
  PATCH_SEAT_SUMMARY_REQUEST = "PATCH_SEAT_SUMMARY_REQUEST",
  PATCH_SEAT_SUMMARY_SUCCESS = "PATCH_SEAT_SUMMARY_SUCCESS",
  PATCH_SEAT_SUMMARY_ERROR = "PATCH_SEAT_SUMMARY_ERROR",
}

export interface SeatSummarySeatsAction {
  type: SeatSummarySeatsActionTypes;
  data: SeatSummarySeatsRequest | SeatSummarySeatsResponse | Error;
}
export interface patchSeatSummaryAction {
  type: SeatSummarySeatsActionTypes;
  data?: EditSeatSummarySeatRequest | EditSeatSummarySeatResponse | Error;
}

export class SeatSummarySeatsActions {
  public static getSeatSummarySeatsRequest(
    request: SeatSummarySeatsRequest
  ): SeatSummarySeatsAction {
    return {
      type: SeatSummarySeatsActionTypes.SEAT_SUMMARY_SEATS_REQUEST,
      data: request,
    };
  }
  public static getSeatSummarySeatsSuccess(
    request: SeatSummarySeatsRequest
  ): SeatSummarySeatsAction {
    return {
      type: SeatSummarySeatsActionTypes.SEAT_SUMMARY_SEATS_SUCCESS,
      data: request,
    };
  }
  public static getSeatSummarySeatsFailure(
    error: Error
  ): SeatSummarySeatsAction {
    return {
      type: SeatSummarySeatsActionTypes.SEAT_SUMMARY_SEATS_ERROR,
      data: error,
    };
  }
  public static patchSeatSummaryRequest(
    request: EditSeatSummarySeatRequest
  ): patchSeatSummaryAction {
    return {
      type: SeatSummarySeatsActionTypes.PATCH_SEAT_SUMMARY_REQUEST,
      data: request,
    };
  }
  public static patchSeatSummarySuccess(
    request: EditSeatSummarySeatRequest
  ): patchSeatSummaryAction {
    return {
      type: SeatSummarySeatsActionTypes.PATCH_SEAT_SUMMARY_SUCCESS,
      data: request,
    };
  }
  public static patchSeatSummaryFailure(error: Error): patchSeatSummaryAction {
    return {
      type: SeatSummarySeatsActionTypes.PATCH_SEAT_SUMMARY_ERROR,
      data: error,
    };
  }
}
