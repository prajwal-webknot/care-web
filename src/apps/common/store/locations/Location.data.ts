import { addressObj } from "../dashboardStatus/dashboardStatus.data";

export interface LocationRequest {
}

export interface groupObj {
  name: string;
}
export interface userObj {
  email: string;
  groups: groupObj[];
  id: Number;
  phone_number: string;
  user_type: string;
  username: string;
}
interface siteObj {
  id: Number,
  name: string;
  capacity: Number;
  address: addressObj;
}

interface unitObj {
  description: string;
  id: Number;
  name: string;
  unit_ref_id: string;
  user: userObj;
}
export interface LocationResponse {
  data: {
    site_details: siteObj[];
    unit_details: unitObj[];
  };
}