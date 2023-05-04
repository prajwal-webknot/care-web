import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { AuthReducer } from "../../common/store/auth/AuthReducer";
import { CensusReducer } from "../../common/store/census/CensusReducer";
import { EmergencyDetailsReducer } from "../../admin/store/reducers/EmergencyDetailsReducer";
import { EmployeesListReducer } from "../../admin/store/reducers/EmployeesListReducer";
import { StatusChangeReducer } from "../../admin/store/reducers/StatusChangeReducer";
import { ContactTracingReducer } from "../../admin/store/reducers/ContactTracingReducer";
import { LunchSeatsReducer } from "../../admin/store/reducers/LunchSeatsReducer";
import { CafeViewReducer } from "../../admin/store/reducers/CafeViewReducer";
import { HotDeskingReducer } from "../../admin/store/reducers/HotDeskingReducer";
import { SeatSummaryReducer } from "../../admin/store/reducers/SeatSummaryReducer";
import { SeatSummarySeatsReducer } from "../../admin/store/reducers/SeatSummarySeatsReducer";
import { EditSeatSummaryReducer } from "../../admin/store/reducers/EditSeatSummaryReducer";
import { RosterReportReducer } from "../../admin/store/reducers/RosterReportReducer";
import { EditCafeReducer } from "../../admin/store/reducers/EditCafeReducer";
import { EditHotDeskingReducer } from "../../admin/store/reducers/EditHotDeskingReducer";
import { TempVisitorReducer } from "../../admin/store/reducers/TempVisitorReducer";
import { EvacuationAlertReducer } from "./evaculationAlert/EvacuationAlertReducer";
import { ExpectedVisitorsReducer } from "../../admin/store/reducers/ExpectedVisitorsReducer";
import { EntrySurveyReducer } from "../../admin/store/reducers/EntrySurveyReducer";
import { ExpiredPassesReducer } from "../../admin/store/reducers/ExpiredPassesReducer";
import { NotificationsReducer } from "./notification/NotificationsReducer";
import { RosterReducer } from "../../manager/store/reducers/RosterReducer";
import { MultidayRosterReducer } from "../../manager/store/reducers/MultidayRosterReducer";
import { PostRosterReducer } from "../../manager/store/reducers/PostRosterReducer";
import { GetFteGuidelinesReducer } from "../../hr/store/reducers/FteGuidelinesReducer";
import { SetFteGuidelinesReducer } from "../../hr/store/reducers/SetFteGuidelinesReducer";
import { NewRegistrationsReducer } from "../../hr/store/reducers/NewRegistrationsReducer";
import { LocationReducer } from "./locations/LocationReducer";
import { DashboardStatusReducer } from "./dashboardStatus/dashboardStatusReducer";
import { SafetyBreachesReducer } from "./safetyBreach/SafetyBreachesReducer";
import { MarkNotificationsReducer } from "./notification/MarkNotificationsReducer";
import { ChangePasswordReducer } from "./changePassword/ChangePasswordReducer";
import { UserDetailsReducer } from "./userDetails/UserDetailsReducer";
import { DeleteUserReducer } from "./userDetails/deleteUserReducer";
import { ConferenceRoomReducer } from "../../manager/store/reducers/ConferenceRoomReducer";
import { PostConfernceRoomBookReducer } from "../../manager/store/reducers/PostConferenceRoomReducer";
import { SearchEmployReducer } from "../../manager/store/reducers/SearchEmployReducer";
import { GetSeatDetailsReducer } from "../../manager/store/reducers/GetSeatDetailsReducer";
import { ConferenceRoomDetailsReducer } from "../../admin/store/reducers/ConferenceRoomDetailsReducer";
import { PostRosterGuestReducer } from "../../manager/store/reducers/RosterGuestReducer";
import { BlockConferenceRoomReducer } from "../../admin/store/reducers/BlockConferenceRoomReducer";
import { GetAvailableSeatsReducer } from "../../admin/store/reducers/GetAvailableSeatsReducer";
import { ConferenceRoomsReducer } from "../../admin/store/reducers/ConferenceRoomsReducer";
import { SwapConferenceReducer } from "../../admin/store/reducers/SwapConferenceReducer";
import { EditExpectedVisitorsReducer } from "../../admin/store/reducers/EditExpectedVisitorsReducer";
import { DateBasedEmployesReducer } from "../../manager/store/reducers/DateBasedEmployesReducer";
export interface ApplicationState { }

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "userDetails"],
};

const rootReducer = combineReducers<ApplicationState>({
  auth: AuthReducer,
  census: CensusReducer,
  emergencyDetails: EmergencyDetailsReducer,
  employees: EmployeesListReducer,
  statusChange: StatusChangeReducer,
  evacuationAlert: EvacuationAlertReducer,
  expectedVisitor: ExpectedVisitorsReducer,
  expiredPasses: ExpiredPassesReducer,
  notification: NotificationsReducer,
  markNotification: MarkNotificationsReducer,
  roster: RosterReducer,
  getSeatDetails: GetSeatDetailsReducer,
  searchEmploy: SearchEmployReducer,
  dateBasedEmployes: DateBasedEmployesReducer,
  multidayRoster: MultidayRosterReducer,
  postRoster: PostRosterReducer,
  postRosterGuest: PostRosterGuestReducer,
  conferenceRoom: ConferenceRoomReducer,
  postConferenceRoomBook: PostConfernceRoomBookReducer,
  entrySurvey: EntrySurveyReducer,
  getFteGuidelines: GetFteGuidelinesReducer,
  setFteGuidelines: SetFteGuidelinesReducer,
  locations: LocationReducer,
  dashboardStatus: DashboardStatusReducer,
  safetyBreaches: SafetyBreachesReducer,
  registrations: NewRegistrationsReducer,
  changePass: ChangePasswordReducer,
  userDetails: UserDetailsReducer,
  deleteUser: DeleteUserReducer,
  contactTracing: ContactTracingReducer,
  lunchSeats: LunchSeatsReducer,
  editCafe: EditCafeReducer,
  cafeView: CafeViewReducer,
  hotDesking: HotDeskingReducer,
  conferenceRoomDetails: ConferenceRoomDetailsReducer,
  conferenceRooms: ConferenceRoomsReducer,
  blockConferenceRoom: BlockConferenceRoomReducer,
  swapConference: SwapConferenceReducer,
  seatSummary: SeatSummaryReducer,
  editHotDesk: EditHotDeskingReducer,
  editExpectedVisitors: EditExpectedVisitorsReducer,
  availableSeats: GetAvailableSeatsReducer,
  rosterReport: RosterReportReducer,
  tempVisitor: TempVisitorReducer,
  seatSummarySeats: SeatSummarySeatsReducer,
  editSeatSummary: EditSeatSummaryReducer,
});

export default persistReducer(persistConfig, rootReducer);
