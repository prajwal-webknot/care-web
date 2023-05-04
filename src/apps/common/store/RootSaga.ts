import { all } from "redux-saga/effects";

import CensusSaga from "./census/CensusSaga";
import EmergencyDetailsSaga from "../../admin/store/sagas/EmergencyDetailsSaga";
import EmployeesListSaga from "../../admin/store/sagas/EmployeesListSaga";
import ContactTracingSaga from "../../admin/store/sagas/ContactTracingSaga";
import LunchSeatsSaga from "../../admin/store/sagas/LunchSeatsSaga";
import CafeViewSaga from "../../admin/store/sagas/CafeViewSaga";
import HotDeskingSaga from "../../admin/store/sagas/HotDeskingSaga";
import ConferenceRoomDetailsSaga from "../../admin/store/sagas/ConferenceRoomDetailsSaga";
import SeatSummarySaga from "../../admin/store/sagas/SeatSummarySaga";
import SeatSummarySeatsSaga from "../../admin/store/sagas/SeatSummarySeatsSaga";
import RosterReportSaga from "../../admin/store/sagas/RosterReportSaga";
import TempVisitorSaga from "../../admin/store/sagas/TempVisitorSaga";
import StatusChangeSaga from "../../admin/store/sagas/StatusChangeSaga";
import EntrySurveySaga from "../../admin/store/sagas/EntrySurveySaga";
import EvacuationAlertSaga from "./evaculationAlert/EvacuationAlertSaga";
import ExpectedVisitorsSaga from "../../admin/store/sagas/ExpectedVisitorsSaga";
import ExpiredPassesSaga from "../../admin/store/sagas/ExpiredPassesSaga";
import NotificationsSaga from "./notification/NotificationsSaga";
import RosterSaga from "../../manager/store/sagas/RosterSaga";
import RosterGuestSaga from "../../manager/store/sagas/RosterGuestSaga";
import GetSeatDetailsSaga from "../../manager/store/sagas/GetSeatDetailsSaga";
import SearchEmploySaga from "../../manager/store/sagas/SearchEmploySaga"
import MultidayRosterSaga from "../../manager/store/sagas/MultidayRosterSaga";
import ConferenceSaga from "../../manager/store/sagas/ConferenceSaga"
import FteGuidelinesSaga from "../../hr/store/sagas/FteGuidelinesSaga";
import AuthSaga from "./auth/AuthSaga";
import LocationSaga from "./locations/LocationSaga";
import UserDetailsSaga from "./userDetails/UserDetailsSaga";
import SafetyBreachesSaga from "./safetyBreach/SafetyBreachesSaga";
import ChangePasswordSaga from "./changePassword/ChangePasswordSaga";
import NewRegistrationsSaga from "../../hr/store/sagas/NewRegistrationsSaga";
import BlockConferenceRoomSaga from "../../admin/store/sagas/BlockConferenceRoomSaga";
import DateBasedEmployesSaga from "../../manager/store/sagas/DateBasedEmployesSaga";

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    CensusSaga(),
    EmergencyDetailsSaga(),
    EmployeesListSaga(),
    StatusChangeSaga(),
    EvacuationAlertSaga(),
    ExpectedVisitorsSaga(),
    ExpiredPassesSaga(),
    NotificationsSaga(),
    RosterSaga(),
    DateBasedEmployesSaga(),
    RosterGuestSaga(),
    GetSeatDetailsSaga(),
    MultidayRosterSaga(),
    SearchEmploySaga(),
    ConferenceSaga(),
    EntrySurveySaga(),
    FteGuidelinesSaga(),
    LocationSaga(),
    SafetyBreachesSaga(),
    NewRegistrationsSaga(),
    ChangePasswordSaga(),
    UserDetailsSaga(),
    ContactTracingSaga(),
    LunchSeatsSaga(),
    CafeViewSaga(),
    HotDeskingSaga(),
    ConferenceRoomDetailsSaga(),
    BlockConferenceRoomSaga(),
    SeatSummarySaga(),
    SeatSummarySeatsSaga(),
    RosterReportSaga(),
    TempVisitorSaga(),

  ]);
}

