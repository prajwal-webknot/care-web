import { ConferenceRequest, ConferenceResponse } from "../../../../tsModels/Conference.data";


export enum ConferenceActionTypes {
    POST_CONFERENCE_ROOM_REQUEST = "GET_CONFERENCE_ROOM_REQUEST",
    POST_CONFERENCE_ROOM_SUCCESS = "GET_CONFERENCE_ROOM_SUCCESS",
    POST_CONFERENCE_ROOM_ERROR = "GET_CONFERENCE_ROOM_ERROR",

    POST_CONFERENCE_ROOM_BOOK_REQUEST = "POST_CONFERENCE_ROOM_BOOK_REQUEST",
    POST_CONFERENCE_ROOM_BOOK_SUCCESS = "POST_CONFERENCE_ROOM_BOOK_SUCCESS",
    POST_CONFERENCE_ROOM_BOOK_ERROR = "POST_CONFERENCE_ROOM_BOOK_ERROR",
}

export interface ConferenceAction {
    type: ConferenceActionTypes,
    data: ConferenceRequest | ConferenceResponse | Error;
}


export class ConferenceActions {
    public static postConferenceRoomRequest(request: ConferenceRequest): ConferenceAction {
        return { type: ConferenceActionTypes.POST_CONFERENCE_ROOM_REQUEST, data: request };
    }
    public static postConferenceRoomSuccess(request: ConferenceRequest): ConferenceAction {
        return { type: ConferenceActionTypes.POST_CONFERENCE_ROOM_SUCCESS, data: request };
    }
    public static postConferenceRoomFailure(error: Error): ConferenceAction {
        return { type: ConferenceActionTypes.POST_CONFERENCE_ROOM_ERROR, data: error };
    }
    // public static getRosterData(request: ConferenceRequest): RosterAction {
    //   return { type: ConferenceActionTypes.POST_ROSTER_ERROR, data: request };
    // }
    public static postConferenceRoomBookRequest(request: ConferenceRequest): ConferenceAction {
        return { type: ConferenceActionTypes.POST_CONFERENCE_ROOM_BOOK_REQUEST, data: request };
    }
    public static postConferenceRoomBookSuccess(request: ConferenceRequest): ConferenceAction {
        return { type: ConferenceActionTypes.POST_CONFERENCE_ROOM_BOOK_SUCCESS, data: request };
    }
    public static postConferenceRoomBookFailure(error: Error): ConferenceAction {
        return { type: ConferenceActionTypes.POST_CONFERENCE_ROOM_BOOK_ERROR, data: error };
    }
}