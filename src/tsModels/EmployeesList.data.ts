import { DynamicQueryPath } from "../apps/common/store/ApiConfig.data";

export interface EmployeesListRequest {

}

export interface EmployeesListResponse {

}

export interface StatusChangeRequest {
  path: DynamicQueryPath;
  payload: any;
}

export interface StatusChangeResponse {

}