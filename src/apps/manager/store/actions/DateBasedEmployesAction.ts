import { DateBasedEmployesRequest, DateBasedEmployesResponse } from "../../../../tsModels/DateBasedEmployes.data";



export enum DateBasedEmployesActionTypes {
    DATE_BASED_EMPLOYES_REQUEST = "DATE_BASED_EMPLOYES_REQUEST",
    DATE_BASED_EMPLOYES_SUCCESS = "DATE_BASED_EMPLOYES_SUCCESS",
    DATE_BASED_EMPLOYES_ERROR = "DATE_BASED_EMPLOYES_ERROR",
}

export interface DateBasedEmployesAction {
    type: DateBasedEmployesActionTypes,
    data: DateBasedEmployesRequest | DateBasedEmployesResponse | Error;
}
export class DateBasedEmployesActions {

    public static DateBasedEmployesRequest(request: DateBasedEmployesRequest): DateBasedEmployesAction {
        return { type: DateBasedEmployesActionTypes.DATE_BASED_EMPLOYES_REQUEST, data: request };
    }
    public static DateBasedEmployesSuccess(request: DateBasedEmployesRequest): DateBasedEmployesAction {
        return { type: DateBasedEmployesActionTypes.DATE_BASED_EMPLOYES_SUCCESS, data: request };
    }
    public static DateBasedEmployesFailure(error: Error): DateBasedEmployesAction {
        return { type: DateBasedEmployesActionTypes.DATE_BASED_EMPLOYES_ERROR, data: error };
    }
}