import {
  EmployeesListActionTypes,
  EmployeesListAction,
} from '../actions/EmployeesListAction';
import { createSelector } from "reselect";

export interface EmployeesState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function EmployeesListReducer(state = initialState, action: EmployeesListAction): EmployeesState {
  switch (action.type) {
    case EmployeesListActionTypes.EMPLOYEES_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case EmployeesListActionTypes.EMPLOYEES_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case EmployeesListActionTypes.EMPLOYEES_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
    default:
      return state;
  }
}

const premiseHeadCountSelector = (store: { employees: EmployeesState; }) => store.employees;

export const employeeListResp = createSelector(premiseHeadCountSelector, (state) => state.data);
export const employeeListLoading = createSelector(premiseHeadCountSelector, (state) => state.isFetching);
