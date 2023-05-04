import { RosterGuestRequest, RosterGuestResponse } from '../../../../tsModels/RosterGuest.data';

export enum RosterGuestActionTypes {

    POST_ROSTER_GUEST_REQUEST = "POST_ROSTER_GUEST_REQUEST",
    POST_ROSTER_GUEST_SUCCESS = "POST_ROSTER_GUEST_SUCCESS",
    POST_ROSTER_GUEST_ERROR = "POST_ROSTER_GUEST_ERROR",
}

export interface RosterGuestAction {
    type: RosterGuestActionTypes,
    data: RosterGuestRequest | RosterGuestResponse | Error;
}

export class RosterGuestActions {

    public static postRosterGuestRequest(request: RosterGuestRequest): RosterGuestAction {
        return { type: RosterGuestActionTypes.POST_ROSTER_GUEST_REQUEST, data: request };
    }
    public static postRosterGuestSuccess(request: RosterGuestRequest): RosterGuestAction {
        return { type: RosterGuestActionTypes.POST_ROSTER_GUEST_SUCCESS, data: request };
    }
    public static postRosterGuestFailure(error: Error): RosterGuestAction {
        return { type: RosterGuestActionTypes.POST_ROSTER_GUEST_ERROR, data: error };
    }
}