import { put, takeLatest } from "redux-saga/effects";
import {
  EmployeesListActionTypes,
  EmployeesListAction,
  EmployeesActions,
} from "../actions/EmployeesListAction";
import AuthService from "../../service/EmployeesListService";
import { EmployeesListRequest, EmployeesListResponse } from "../../../../tsModels/EmployeesList.data";

function* getEmployeesData(payload: EmployeesListRequest): IterableIterator<any> {

  try {
    const response: undefined | EmployeesListResponse = yield AuthService.employeesList(payload);
    yield put(EmployeesActions.getEmployeesSuccess(response as any));
  } catch (error) {
    yield put(EmployeesActions.getEmployeesFailure(error as any));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(EmployeesListActionTypes.EMPLOYEES_LIST_REQUEST, (action: EmployeesListAction) => getEmployeesData(action.data as EmployeesListRequest));
}

export default authWatcher;
