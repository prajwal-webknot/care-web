import { createSelector } from 'reselect';
import { GetSeatDetailsAction, GetSeatDetailsActionTypes } from '../actions/GetSeatDetailsAction';


export interface GetSeatDetailsState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined,
}


const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function GetSeatDetailsReducer(state = initialState, action: GetSeatDetailsAction): GetSeatDetailsState {
    switch (action.type) {
        case GetSeatDetailsActionTypes.GET_SEAT_DETAILS_REQUEST:
            return {
                ...state,
                error: false,
                data: undefined,
            };
        case GetSeatDetailsActionTypes.GET_SEAT_DETAILS_SUCCESS:
            return {
                ...state,
                error: false,
                data: action.data,
            };
        case GetSeatDetailsActionTypes.GET_SEAT_DETAILS_ERROR:
            return {
                ...state,
                error: true,
                data: action.data,
            };
        default:
            return state;
    }
}

const GetSeatDetailsSelector = (store: { getSeatDetails: GetSeatDetailsState; }) => store.getSeatDetails;

export const GetSeatDetailsResponse = createSelector(GetSeatDetailsSelector, (state) => state.data);
export const GetSeatDetailsisFetching = createSelector(GetSeatDetailsSelector, (state) => state.isFetching);