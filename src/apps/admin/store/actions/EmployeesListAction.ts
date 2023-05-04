
import { EmployeesListRequest, EmployeesListResponse } from '../../../../tsModels/EmployeesList.data';

export enum EmployeesListActionTypes {
  EMPLOYEES_LIST_REQUEST = "EMPLOYEES_LIST_REQUEST",
  EMPLOYEES_LIST_SUCCESS = "EMPLOYEES_LIST_SUCCESS",
  EMPLOYEES_LIST_ERROR = "EMPLOYEES_LIST_ERROR"
}

export interface EmployeesListAction {
  type: EmployeesListActionTypes,
  data: EmployeesListRequest | EmployeesListResponse | Error;
}



export class EmployeesActions {
  public static getEmployeesRequest(request: EmployeesListRequest): EmployeesListAction {
    return { type: EmployeesListActionTypes.EMPLOYEES_LIST_REQUEST, data: request };
  }
  public static getEmployeesSuccess(request: EmployeesListRequest): EmployeesListAction {
    return { type: EmployeesListActionTypes.EMPLOYEES_LIST_SUCCESS, data: request };
  }
  public static getEmployeesFailure(error: Error): EmployeesListAction {
    return { type: EmployeesListActionTypes.EMPLOYEES_LIST_ERROR, data: error };
  }
}

