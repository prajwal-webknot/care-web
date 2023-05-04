
import { createSelector } from "reselect";
import { ConferenceRoomDetailsAction, ConferenceRoomDetailsActionTypes } from "../actions/ConferenceRoomDetailsActions";

export interface ConferenceRoomsState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
}

const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function ConferenceRoomsReducer(
    state = initialState,
    action: ConferenceRoomDetailsAction
): ConferenceRoomsState {
    switch (action.type) {
        case ConferenceRoomDetailsActionTypes.GET_CONFERENCE_ROOMS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                data: undefined,
            };
        case ConferenceRoomDetailsActionTypes.GET_CONFERENCE_ROOMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                data: action.data,
            };
        case ConferenceRoomDetailsActionTypes.GET_CONFERENCE_ROOMS_ERROR:
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

const ConferenceRoomsSelector = (store: { conferenceRooms: ConferenceRoomsState }) =>
    store.conferenceRooms;
export const getConferenceRoomsResponse = createSelector(
    ConferenceRoomsSelector,
    (state) => state.data
);
export const getConferenceRoomsFetching = createSelector(
    ConferenceRoomsSelector,
    (state) => state.isFetching
);
export const getConferenceRoomsError = createSelector(
    ConferenceRoomsSelector,
    (state) => state.isFetching
);