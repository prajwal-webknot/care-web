import { takeLatest } from "redux-saga/effects";
import {
  DashboardStatusAction,
  DashboardStatusActionTypes,
} from "./dashboardStatusActions";

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(DashboardStatusActionTypes.CHANGE_SITE, (action: DashboardStatusAction) => () => null);
  yield takeLatest(DashboardStatusActionTypes.CHANGE_UNIT, (action: DashboardStatusAction) => () => null);
  yield takeLatest(DashboardStatusActionTypes.CHANGE_PERSONA, (action: DashboardStatusAction) => () => null);
}

export default authWatcher;
