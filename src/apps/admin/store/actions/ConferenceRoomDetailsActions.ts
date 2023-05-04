import { ConferenceRoomDetailsRequest, ConferenceRoomDetailsResponse, EditConferenceRoomDetailsRequest, EditConferenceRoomDetailsResponse } from "../../../../tsModels/ConferenceRoomDetails.data";


export enum ConferenceRoomDetailsActionTypes {
    CONFERENCE_ROOM_DETAILS_REQUEST = "CONFERENCE_ROOM_DETAILS_REQUEST",
    CONFERENCE_ROOM_DETAILS_SUCCESS = "CONFERENCE_ROOM_DETAILS_SUCCESS",
    CONFERENCE_ROOM_DETAILS_ERROR = "CONFERENCE_ROOM_DETAILS_ERROR",
    GET_CONFERENCE_ROOMS_REQUEST = "GET_CONFERENCE_ROOMS_REQUEST",
    GET_CONFERENCE_ROOMS_SUCCESS = "GET_CONFERENCE_ROOMS_SUCCESS",
    GET_CONFERENCE_ROOMS_ERROR = "GET_CONFERENCE_ROOMS_ERROR",
    POST_SWAP_CONFERENCE_REQUEST = "POST_SWAP_CONFERENCE_REQUEST",
    POST_SWAP_CONFERENCE_SUCCESS = "POST_SWAP_CONFERENCE_SUCCESS",
    POST_SWAP_CONFERENCE_ERROR = "POST_SWAP_CONFERENCE_ERROR",
    PATCH_CONFERENCE_ROOM_DETAILS_REQUEST = "PATCH_CONFERENCE_ROOM_DETAILS_REQUEST",
    PATCH_CONFERENCE_ROOM_DETAILS_SUCCESS = "PATCH_CONFERENCE_ROOM_DETAILS_SUCCESS",
    PATCH_CONFERENCE_ROOM_DETAILS_ERROR = "PATCH_CONFERENCE_ROOM_DETAILS_ERROR",
}

export interface ConferenceRoomDetailsAction {
    type: ConferenceRoomDetailsActionTypes;
    data: ConferenceRoomDetailsRequest | ConferenceRoomDetailsResponse | Error;
}
export interface patchConferenceRoomDetailsAction {
    type: ConferenceRoomDetailsActionTypes;
    data?: EditConferenceRoomDetailsRequest | EditConferenceRoomDetailsResponse | Error;
}

export class ConferenceRoomDetailsActions {
    public static getConferenceRoomDetailsRequest(
        request: ConferenceRoomDetailsRequest
    ): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.CONFERENCE_ROOM_DETAILS_REQUEST, data: request };
    }
    public static getConferenceRoomDetailsSuccess(
        request: ConferenceRoomDetailsRequest
    ): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.CONFERENCE_ROOM_DETAILS_SUCCESS, data: request };
    }
    public static getConferenceRoomDetailsFailure(error: Error): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.CONFERENCE_ROOM_DETAILS_ERROR, data: error };
    }
    public static getConferenceRoomsRequest(
        request: ConferenceRoomDetailsRequest
    ): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.GET_CONFERENCE_ROOMS_REQUEST, data: request };
    }
    public static getConferenceRoomsSuccess(
        request: ConferenceRoomDetailsRequest
    ): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.GET_CONFERENCE_ROOMS_SUCCESS, data: request };
    }
    public static getConferenceRoomsFailure(error: Error): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.GET_CONFERENCE_ROOMS_ERROR, data: error };
    }

    public static postSwapConferenceRequest(
        request: ConferenceRoomDetailsRequest
    ): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.POST_SWAP_CONFERENCE_REQUEST, data: request };
    }
    public static postSwapConferenceSuccess(
        request: ConferenceRoomDetailsRequest
    ): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.POST_SWAP_CONFERENCE_SUCCESS, data: request };
    }
    public static postSwapConferenceFailure(error: Error): ConferenceRoomDetailsAction {
        return { type: ConferenceRoomDetailsActionTypes.POST_SWAP_CONFERENCE_ERROR, data: error };
    }

    // public static patchHotDeskRequest(
    //     request: EditConferenceRoomDetailsRequest
    // ): patchConferenceRoomDetailsAction {
    //     return {
    //         type: ConferenceRoomDetailsActionTypes.PATCH_CONFERENCE_ROOM_DETAILS_REQUEST,
    //         data: request,
    //     };
    // }
    // public static patchHotDeskSuccess(
    //     request: EditConferenceRoomDetailsRequest
    // ): patchConferenceRoomDetailsAction {
    //     return {
    //         type: ConferenceRoomDetailsActionTypes.PATCH_CONFERENCE_ROOM_DETAILS_SUCCESS,
    //         data: request,
    //     };
    // }
    // public static patchHotDeskFailure(error: Error): patchConferenceRoomDetailsAction {
    //     return { type: ConferenceRoomDetailsActionTypes.PATCH_CONFERENCE_ROOM_DETAILS_ERROR, data: error };
    // }
}
