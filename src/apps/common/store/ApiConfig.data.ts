/**
 * Defines HTTP content type supported by APIs.
 */
export enum HttpContentType {
  Json = "application/json",
  File = "multipart/form-data",
}

/**
 * Static end-points for all APIs. In case endpoint has dynamic values,
 * pass it in query object while calling API-SERVICE and it will be
 * appended at the end.
 */
export enum EndPoints {
  Auth = "/api/v1/authentication/login",
  Logout = "/api/v1/authentication/logout",
  Census = "/api/v1/core/census",
  EPass = "/api/v1/epass",
  DateBasedEmployes = "/api/v1/epass",
  ExpireEPass = "/api/v1/epass/expired",
  EmergencyDetails = "/api/v1/admin/emergency-details",
  Notifications = "/api/v1/core/notification/",
  Roster = "/api/v1/roster/roster_details/dashboard",
  GuestRoster = "/api/v1/epass/guest-roster/",
  MultidayRoster = "/api/v1/epass/team-roster/",
  PostRoster = "/api/v1/roster/roster_detail/",
  SearchEmploy = "/api/v1/user/get-employee/",
  GetSeatDetails = "/api/v1/user/get-employee-seat",
  Sites = "/api/v1/sites",
  EntrySurvey = "/api/v1/survey?topic=PREMISE_ENTRY_SURVEY",
  PostSurvey = "/api/v1/survey/premises",
  EvacuationAlert = "/api/v1/officesite/emergencyevacuation/",
  GetGuideLines = "/api/v1/officesite/guidelines",
  SetGuideLines = "/api/v1/officesite/dashboard/guidelines",
  Locations = "/api/v1/officesite/locations",
  SafetyBreaches = "/api/v1/proximity/breached_user_details",
  NewRegistrations = "/api/v1/user/new-users/",
  ChangePassword = "/api/v1/authentication/change-password",
  UserDetails = "/api/v1/user/details",
  ContactTracing = "/api/v1/proximity/contact_tracing_list/",
  LunchSeat = "/api/v1/cafeteria-slot/cafeteria/",
  EditCafe = "/api/v1/cafeteria-slot/cafeteria",
  cafeView = "/api/v1/cafeteria-slot/user-details",
  hotDesking = "/api/v1/hot-desking",
  availableSeats = "/api/v1/hot-desking/available-seats",
  getConferenceBookings = "/api/v1/conference_room/booking/",
  getConferenceRooms = "/api/v1/conference_room",
  seatSummary = "/api/v1/hot-desking/seat-info",
  EditHotDesk = "/api/v1/hot-desking/",
  EditExpectedVisitor = "/api/v1/hot-desking/allotted-seat-edit",
  RosterReport = "/api/v1/roster/report",
  TempVisitor = "/api/v1/user/temporary-visitor",
  ExitTempVisitor = "/api/v1/user/temporary-visitor",
  seatSummarySeats = "/api/v1/hot-desking/allotted-seat-edit",
  editSeatSummarySeat = "/api/v1/hot-desking/allotted-seat-edit",
  ConferenceRoom = "/api/v1/conference_room/recommendation",
  ConferenceRoomBook = "/api/v1/conference_room/booking",
  BlockConferenceRoom = "/api/v1/conference_room/update",
  SwapConferenceRoom = "/api/v1/conference_room/update-booking",
}

export interface Query {
  [paramName: string]: string | number | boolean | null;
}

/**
 * Adds values dynamically to Api Endpoints
 * Use @param DynamicRoute to append urls like "baseUrl/staticEndpoint/{routeParam1}/{routeParam2}/..."
 * Use @param dynamicQueryParams to append urls like "baseUrl/staticEndpoint?{name1}={value1}&{name2}={value2}..." *
 */
export interface DynamicQueryPath {
  readonly dynamicRoute?: string[] | undefined | null;
  readonly dynamicQueryParams?: Query[] | undefined | null;
}

export interface ErrorResp {
  message: string;
}

export interface ErrorObj {
  errorCode: number;
  errorMsg: Error;
  errorResp: ErrorResp;
}
