import { put, takeLatest } from "redux-saga/effects";
import {
  RosterReportAction,
  RosterReportActionTypes,
  RosterReportActions,
} from "../actions/RosterReportAction";
import RosterReportService from "../../service/RosterReportService";
import {
  RosterReportRequest,
  RosterReportResponse,
} from "../../../../tsModels/RosterReport.data";

function* getRosterReport(payload: RosterReportRequest): IterableIterator<any> {
  try {
    const response:
      | undefined
      | RosterReportResponse = yield RosterReportService.RosterReport(payload);
    yield put(RosterReportActions.getRosterReportSuccess(response as any));
  } catch (error) {
    yield put(RosterReportActions.getRosterReportFailure(error));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    RosterReportActionTypes.ROSTER_REPORT_REQUEST,
    (action: RosterReportAction) => getRosterReport(action.data as RosterReportRequest)
  );
}

export default authWatcher;
