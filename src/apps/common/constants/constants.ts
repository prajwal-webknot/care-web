export const LOGGING = false;


//Manager Approvals 

export const APPROVAL_ERROR_BUFFER = "Site guidelines is full for all requests"



//

export const FORM_TITLE = "Login";
export const FORM_ID_LABEL = "User ID";
export const FORM_PASS_LABEL = "PASSWORD";
export const LOGIN = "LOGIN";

//expected visitors 
export const CONFERENCE = "conference_room";
export const BUFFER = "buffer";
export const ROSTER = "roster";
export const GUEST = "guest";

// routes
export const LOGIN_PATH = "/login";
export const MANAGER_DASHBOARD = "/manager";
export const ADMIN_DASHBOARD = "/admin";
export const SECURITY_DASHBOARD = "/security";
export const HR_DASHBOARD = "/";
export const EMPLOYEES_DETAILS = `/employees`;
export const EXPECTED_VISITORS_DETAILS = "/expected-walkins";
export const EXPECTED_VISITORS_DETAILS_SECURITY = "/expected-walkins-security";
export const EXPIRED_PASSES_DETAILS = (persona: string) =>
  `/expired-passes/${persona}`;
export const APPROVAL_DETAILS = (persona: string) => `/approval/${persona}`;
export const TEAM_ROSTER = "/roster";
export const SAFETY_BREACHES_DETAILS = (persona: string) =>
  `/safety-breaches/${persona}`;
export const SUMMARY = "/summary";
export const USER_COUNT = "/user-headcount";
export const HEAD_COUNT = (type: string) => `/headcount/${type}`;

export const LOW = "low";
export const MEDIUM = "medium";
export const HIGH = "high";
export const PERMITTED = "Permitted";
export const LIMITED = "Limited";
export const RESTRICTED = "Restricted";
export const RISK_STATUS_MAPPER = {
  [LOW]: "Permitted",
  [MEDIUM]: "Limited",
  [HIGH]: "Restricted",
};

export const RISK_STATUS_MAPPER_FUNC = (value: "low" | "high" | "medium") => {
  return RISK_STATUS_MAPPER[value];
};

export const BODY_TEMP = ["Safe", "Unsafe"];
export const RISK_STATUS = [LOW, MEDIUM, HIGH];
export const R2W_INDEX_STATUS = [PERMITTED, LIMITED, RESTRICTED];
export const AROGYASETU_STATUS = ["Green", "Yellow", "Red", "Orange"];
export const NATURE_OF_VISIT = ["Employee", "Visitor", "Non Employees "];
export const UNITS = ["Unit 1", "Unit 2", "Unit 3", "Unit 4"];
export const CITIES = ["All Cities", "Delhi", "Mumbai", "Banglore"];
export const STATUS_TYPES = ["All Status", "Approved", "Rejected"];
export const MANAGER_TYPES = ["All Managers", "Manager 1", "Manager 2"];
export const COLOR_MAPPING = { low: "green", high: "red", medium: "orange" };

export const NO_DATA_FOUND = "-";

export const EVACUATION_ALERT_SUCCESS =
  "Evacuation alert has been successfully activated.";
export const EVACUATION_ALERT_FAILURE =
  "Sorry we're unable to process evacuation alert request. Please contact support.";
export const ARRIVED_ALERT_SUCCESS = (status: string) =>
  `The selected user is ${status} successfully.`;
export const ARRIVED_ALERT_FAILURE = (status: string) =>
  `Sorry we're unable to perform this action. Please contact support.`;
export const REVOKE_ACCESS_SUCCESS =
  "All the access of the selected user has been revoked successfully.";
export const REVOKE_ACCESS_FAILURE =
  "Sorry we're unable revoke access for the selected user. Please contact support.";
export const PASSWORD_CHANGE_SUCCESS =
  "Your password has been changed successfully.";
export const PASSWORD_CHANGE_FAILURE =
  "The current password that you've entered is incorrect. Please try again.";
export const EDIT_CAFE_SUCCESS = (msg: string) => msg;
export const EDIT_CAFE_FAILURE = (status: string) => `Unable to edit cafe`;
export const EDIT_HOT_DESK_SUCCESS = (msg: string) => msg;
export const EDIT_HOT_DESK_FAILURE = (status: string) => `Unable to update user seating`;
export const TEMP_VISIT_SUCCESS = (msg: string) => msg;
export const TEMP_VISIT_FAILURE = (msg: string) => msg;
export const PATH_MAPPER = {
  manager: MANAGER_DASHBOARD,
  hr: HR_DASHBOARD,
  admin: ADMIN_DASHBOARD,
  security: SECURITY_DASHBOARD,
  employee: "",
};
export const KEY_MAPPER = {
  manager: "manager",
  hr: "",
  admin: "admin",
  employee: "",
};

export const MOBILE_VIEW_UNAVAILABLE_MSG =
  "This feature is only available on Desktop.";

export const MANAGER_ROLE = "manager";
export const HR_ROLE = "hr";
export const ADMIN_ROLE = "admin";
export const SECURITY_ROLE = "security";
export const EMPLOYEE_ROLE = "employee";

export const EPASS_STATUS_ARRIVED = "arrived";
export const EPASS_STATUS_EXPIRED = "expire";
export const EPASS_STATUS_APPROVED = "approved";
export const EPASS_STATUS_REFUSED = "refused";
export const EPASS_STATUS_NOT_ALLOWED = "not_allowed";

export const ALLOW_ENTRY = "Allow Entry";
export const DENY_ENTRY = "Deny Entry";

export const ERROR_CODE_401 = 401;
export const SUCCESS_CODE_200 = 200;

export const NAME_KEY = "name";
export const LAST_NAME = "last_name";
export const FIRST_NAME = "first_name";
export const TYPE_KEY = "type";
export const SITE_KEY = "site";
export const NATURE_OF_VISIT_KEY = "nature_of_visit";
export const NATURE_OF_EMPLOYMENT = "nature_of_employment";
export const RISK_STATUS_KEY = "risk_status";
export const STATUS_KEY = "status";
export const APPROVAL_STATUS_KEY = "approval_status";
export const PASS_EXPIRE_TIME_KEY = "pass_expiring_time";
export const PASS_EXPIRE_TIME_WITH_DATE = "pass_expiring_time_with_date";
export const BLUEOOTH_STATUS_KEY = "bluetooth_status";
export const NATURE_OF_APPROVAL_KEY = "nature_of_approval";
export const ROSTER_STATUS = "roster_status";
export const INSIDE_PREMISES = "inside_premise";
export const TOTAL_CONTACTS = "total_contacts";

//constants added for lunch booking
export const SERIAL_NUMBER = "serial_number";
export const CAFETERIA_NAME = "cafeteria_name";
export const SITE_NAME = "site_name";
export const AVAILABLE_SEATS = "available_seats";
export const IS_ACTIVE = "is_active";
export const LUNCH_ACTION = "lunch_action";


//constants added for conference room details 

export const ORGANISER = "organiser";
export const TITLE = "title";
export const CONFERENCE_ROOM_NUMBER = "conference_room_number";
export const ROOM_NUMBER = "room_number";
export const STARTING_TIME = "starting_time";
export const ENDING_TIME = "ending_time";
export const FLOOR = "floor";

//constants added for cafeView

export const USER_NAME = "username";
export const SLOT = "slot";

//constants added for hot desking
// export const EMPLOYEE_NAME = "employee_name";
export const SEAT = "seat";
export const EMAIL = "email";
export const PHONE_NUMBER = "phone_number";
export const POORNATA_ID = "poornata_id";
export const UNIT_BUSINESS = "unit_business";
export const DATE = "date";
export const TIME = "time";
export const ROASTER_STATUS = "roaster_status";

export const SEAT_TYPE = "seat_type";
export const UNIT_NAME = "unit_name";
export const EMPLOYEE_NATURE_OF_VISIT = "employee_nature_of_visit";
export const EPASS_STATUS = "epass_status";
export const ALLOCATED_SEAT = "alloted_seat";
export const SEAT_CLUSTER = "seat_cluster";
export const ADDED_BY = "added_by";
// export const EMPLOYEE_SITE_NAME = "employee_site_name";

export const EMPLOYEE_LABEL = "Employees";
export const VISITORS_LABEL = "Visitors";
export const BUFFER_ALLOCATIONS = "Buffer Allocations";
export const CONFERENCE_ROOM = "Conference Room";
export const CONFERENCE_BOOKING = "Conference Bookings";
export const TEMPORARY_MEMBER_LABEL = "Non Employees";
export const SUMMARY_BY_NATURE_OF_VISIT = "Nature of Visitors";
export const SUMMARY_BY_WORK_INDEX = "Summary By Return 2 Work Index";
export const RETURN_2_WORK_INDEX = "Return 2 Work Index";
export const BLUETOOTH_STATUS = "Bluetooth Status";
export const SUMMARY_BY_BLUETOOTH_STATUS = "Summary By Bluetooth Status";
export const R2W_INDEX = "R2W Index";
export const REVOKE_DAY_PASS = "Revoke Day Pass";
export const REVOKE_ACCESS = "Revoke Access";
export const CONFIRM = "Confirm";

// Admin
export const UNSAFE_TEMP = "Unsafe";
export const SAFE_TEMP = "Safe";
export const BODY_TEMPRATURE_LABEL = "Body temperature";
export const SETU_STATUS = "Arogya Setu status";
export const GREEN = "Green";
export const YELLOW = "Yellow";
export const RED = "Red";

// Manager
export const NO_SELECTED_EMPLOY = "Select atleast 1 team member";
export const POST_ROSTER_SUCCESS = "Roster has been created successfully.";
export const POST_ROSTER_FAILURE =
  "Sorry we're unable to create roster at the moment. Please contact support.";
export const LIMIT_REACHED_MSG = (limit: number) =>
  `Only a maximum of ${limit} employee(s) can be marked as per the current site guidelines.`;
export const LABEL_KEY = "label";

// Manager multiday
export const POST_MULTIDAY_ROSTER_SUCCESS = "Multiday Roster has been created successfully"
export const POST_MULTIDAY_ROSTER_FAILURE =
  "Sorry we're unable to create multiday roster at the moment. Please contact support.";

//Common
export const RAISE_EVAC_ALERT_LABEL = "Raise Evacuation Alert";
export const REGISTERED_EMPLOYEES = "Total Registered Users";
