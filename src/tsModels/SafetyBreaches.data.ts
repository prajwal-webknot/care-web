export interface SafetyBreachesRequest {

}

interface employeeObj {
  bt_status: boolean;
  id: Number;
  name: string;
  nature_of_visit: string;
  risk_status: string;
}
export interface SafetyBreachesResponse {
  data: employeeObj[];
}