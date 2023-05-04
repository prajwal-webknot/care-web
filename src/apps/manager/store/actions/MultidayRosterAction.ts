import { MultidayRosterRequest, MultidayRosterResponse } from "../../../../tsModels/MultidayRoster.data";



export enum MultidayRosterActionTypes {
    POST_MULTIDAY_ROSTER_REQUEST = "POST_MULTIDAY_ROSTER_REQUEST",
    POST_MULTIDAY_ROSTER_SUCCESS = "POST_MULTIDAY_ROSTER_SUCCESS",
    POST_MULTIDAY_ROSTER_ERROR = "POST_MULTIDAY_ROSTER_ERROR",
}

export interface MultidayRosterAction {
    type: MultidayRosterActionTypes,
    data: MultidayRosterRequest | MultidayRosterResponse | Error;
}
export class MultidayRosterActions {

    public static postRosterRequest(request: MultidayRosterRequest): MultidayRosterAction {
        return { type: MultidayRosterActionTypes.POST_MULTIDAY_ROSTER_REQUEST, data: request };
    }
    public static postRosterSuccess(request: MultidayRosterRequest): MultidayRosterAction {
        return { type: MultidayRosterActionTypes.POST_MULTIDAY_ROSTER_SUCCESS, data: request };
    }
    public static postRosterFailure(error: Error): MultidayRosterAction {
        return { type: MultidayRosterActionTypes.POST_MULTIDAY_ROSTER_ERROR, data: error };
    }
}