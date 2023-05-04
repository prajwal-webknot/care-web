
import { createSelector } from "reselect";
import { ConferenceRoomDetailsAction, ConferenceRoomDetailsActionTypes } from "../actions/ConferenceRoomDetailsActions";

export interface ConferenceRoomDetailsState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
}

const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function ConferenceRoomDetailsReducer(
    state = initialState,
    action: ConferenceRoomDetailsAction
): ConferenceRoomDetailsState {
    switch (action.type) {
        case ConferenceRoomDetailsActionTypes.CONFERENCE_ROOM_DETAILS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                data: undefined,
            };
        case ConferenceRoomDetailsActionTypes.CONFERENCE_ROOM_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                data: action.data,
            };
        case ConferenceRoomDetailsActionTypes.CONFERENCE_ROOM_DETAILS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: true,
                data: action.data,
            };
        default:
            return state;
    }
}

const ConferenceRoomDetailsSelector = (store: { conferenceRoomDetails: ConferenceRoomDetailsState }) =>
    store.conferenceRoomDetails;
export const ConferenceRoomDetailsResponse = createSelector(
    ConferenceRoomDetailsSelector,
    (state) => state.data
);
export const ConferenceRoomDetailsFetching = createSelector(
    ConferenceRoomDetailsSelector,
    (state) => state.isFetching
);