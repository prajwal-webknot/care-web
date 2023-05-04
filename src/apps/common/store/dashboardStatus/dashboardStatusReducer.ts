import { createSelector } from 'reselect';
import { DashboardStatusAction, DashboardStatusActionTypes } from './dashboardStatusActions';

export interface DashboardStatusState {
  site: any,
  unit: any,
  persona: string;
}


const initialState = {
  site: {id: ""},
  unit: {id: ""},
  persona: ''
};

export function DashboardStatusReducer(state = initialState, action: DashboardStatusAction): DashboardStatusState {
  
  switch (action.type) {
    case DashboardStatusActionTypes.CHANGE_SITE:
      return {
        ...state,
        site: action.data
      };
    case DashboardStatusActionTypes.CHANGE_UNIT:
      return {
        ...state,
        unit: action.data
      };
    case DashboardStatusActionTypes.CHANGE_PERSONA:
      return {
        ...state,
        persona: action.data
      };
    default:
      return state;
  }
}

const dashboardStatusSelector = (store: { dashboardStatus: DashboardStatusState; }) => store.dashboardStatus;

export const dashboardStatusChange = createSelector(dashboardStatusSelector, (state) => state);
