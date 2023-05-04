
import { DashboardStatusRequest } from './dashboardStatus.data';
export enum DashboardStatusActionTypes {
  CHANGE_SITE = "CHANGE_SITE",
  CHANGE_UNIT = "CHANGE_UNIT",
  CHANGE_PERSONA = "CHANGE_PERSONA",
}

export interface DashboardStatusAction {
  type: DashboardStatusActionTypes,
  data: any;
}

export class DashboardStatusActions {
  public static changeSite(request: DashboardStatusRequest): DashboardStatusAction {
    return { type: DashboardStatusActionTypes.CHANGE_SITE, data: request };
  }
  public static changeUnit(request: DashboardStatusRequest): DashboardStatusAction {
    return { type: DashboardStatusActionTypes.CHANGE_UNIT, data: request };
  }
  public static changePersona(request: DashboardStatusRequest): DashboardStatusAction {
    return { type: DashboardStatusActionTypes.CHANGE_PERSONA, data: request };
  }
}

