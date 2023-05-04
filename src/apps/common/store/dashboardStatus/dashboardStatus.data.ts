export interface addressObj {
  address: {
    id: Number;
    building_number: Number;
    address_line_1: string;
    address_line_2: string;
    locality: string;
    city: string;
    district: string;
    state: string;
    country: string;
    zip_code: Number;
    address_type: string;
    containment_status: string;
    latitude: Number;
    longitude: Number;
  };

}
export interface DashboardStatusRequest {
  id: Number;
  name: string;
  address: addressObj;
  capacity: Number;
}

export interface DashboardStatusResponse {

}
