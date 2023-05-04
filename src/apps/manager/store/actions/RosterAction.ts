import { RosterRequest, RosterResponse } from '../../../../tsModels/Roster.data';

export enum RosterActionTypes {
  GET_ROSTER_REQUEST = "GET_ROSTER_REQUEST",
  GET_ROSTER_SUCCESS = "GET_ROSTER_SUCCESS",
  GET_ROSTER_ERROR = "GET_ROSTER_ERROR",
  // GET_ROSTER_DATA = "GET_ROSTER_DATA",
  POST_ROSTER_REQUEST = "POST_ROSTER_REQUEST",
  POST_ROSTER_SUCCESS = "POST_ROSTER_SUCCESS",
  POST_ROSTER_ERROR = "POST_ROSTER_ERROR",
}

export interface RosterAction {
  type: RosterActionTypes,
  data: RosterRequest | RosterResponse | Error;
}

export class RosterActions {
  public static getRosterRequest(request: RosterRequest): RosterAction {
    return { type: RosterActionTypes.GET_ROSTER_REQUEST, data: request };
  }
  public static getRosterSuccess(request: RosterRequest): RosterAction {
    return { type: RosterActionTypes.GET_ROSTER_SUCCESS, data: request };
  }
  public static getRosterFailure(error: Error): RosterAction {
    return { type: RosterActionTypes.GET_ROSTER_ERROR, data: error };
  }
  // public static getRosterData(request: RosterRequest): RosterAction {
  //   return { type: RosterActionTypes.POST_ROSTER_ERROR, data: request };
  // }
  public static postRosterRequest(request: RosterRequest): RosterAction {
    return { type: RosterActionTypes.POST_ROSTER_REQUEST, data: request };
  }
  public static postRosterSuccess(request: RosterRequest): RosterAction {
    return { type: RosterActionTypes.POST_ROSTER_SUCCESS, data: request };
  }
  public static postRosterFailure(error: Error): RosterAction {
    return { type: RosterActionTypes.POST_ROSTER_ERROR, data: error };
  }
}