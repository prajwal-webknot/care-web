import { SearchEmployRequest, SearchEmployResponse } from "../../../../tsModels/SearchEmploy.data";



export enum SearchEmployActionTypes {
    SEARCH_EMPLOY_REQUEST = "SEARCH_EMPLOY_REQUEST",
    SEARCH_EMPLOY_SUCCESS = "SEARCH_EMPLOY_SUCCESS",
    SEARCH_EMPLOY_ERROR = "SEARCH_EMPLOY_ERROR",
}

export interface SearchEmployAction {
    type: SearchEmployActionTypes,
    data: SearchEmployRequest | SearchEmployResponse | Error;
}
export class SearchEmployActions {

    public static searchEmployRequest(request: SearchEmployRequest): SearchEmployAction {
        return { type: SearchEmployActionTypes.SEARCH_EMPLOY_REQUEST, data: request };
    }
    public static searchEmploySuccess(request: SearchEmployRequest): SearchEmployAction {
        return { type: SearchEmployActionTypes.SEARCH_EMPLOY_SUCCESS, data: request };
    }
    public static searchEmployFailure(error: Error): SearchEmployAction {
        return { type: SearchEmployActionTypes.SEARCH_EMPLOY_ERROR, data: error };
    }
}