import { GetSeatDetailsRequest, GetSeatDetailsResponse } from "../../../../tsModels/GetSeatDetails.data";




export enum GetSeatDetailsActionTypes {
    GET_SEAT_DETAILS_REQUEST = "GET_SEAT_DETAILS_REQUEST",
    GET_SEAT_DETAILS_SUCCESS = "GET_SEAT_DETAILS_SUCCESS",
    GET_SEAT_DETAILS_ERROR = "GET_SEAT_DETAILS_ERROR",
}

export interface GetSeatDetailsAction {
    type: GetSeatDetailsActionTypes,
    data: GetSeatDetailsRequest | GetSeatDetailsResponse | Error;
}
export class GetSeatDetailsActions {

    public static GetSeatDetailsRequest(request: GetSeatDetailsRequest): GetSeatDetailsAction {
        return { type: GetSeatDetailsActionTypes.GET_SEAT_DETAILS_REQUEST, data: request };
    }
    public static GetSeatDetailsSuccess(request: GetSeatDetailsRequest): GetSeatDetailsAction {
        return { type: GetSeatDetailsActionTypes.GET_SEAT_DETAILS_SUCCESS, data: request };
    }
    public static GetSeatDetailsFailure(error: Error): GetSeatDetailsAction {
        return { type: GetSeatDetailsActionTypes.GET_SEAT_DETAILS_ERROR, data: error };
    }
}