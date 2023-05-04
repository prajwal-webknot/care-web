import {
  RosterReportRequest,
  RosterReportResponse,
} from "../../../../tsModels/RosterReport.data";

export enum RosterReportActionTypes {
  ROSTER_REPORT_REQUEST = "ROSTER_REPORT_REQUEST",
  ROSTER_REPORT_SUCCESS = "ROSTER_REPORT_SUCCESS",
  ROSTER_REPORT_ERROR = "ROSTER_REPORT_ERROR",
}

export interface RosterReportAction {
  type: RosterReportActionTypes;
  data: RosterReportRequest | RosterReportResponse | Error;
}

export class RosterReportActions {
  public static getRosterReportRequest(
    request: RosterReportRequest
  ): RosterReportAction {
    return {
      type: RosterReportActionTypes.ROSTER_REPORT_REQUEST,
      data: request,
    };
  }
  public static getRosterReportSuccess(
    request: RosterReportRequest
  ): RosterReportAction {
    return {
      type: RosterReportActionTypes.ROSTER_REPORT_SUCCESS,
      data: request,
    };
  }
  public static getRosterReportFailure(error: Error): RosterReportAction {
    return { type: RosterReportActionTypes.ROSTER_REPORT_ERROR, data: error };
  }
}
