import { createSelector } from 'reselect';
import { ConferenceAction, ConferenceActionTypes } from '../actions/ConferenceAction';

export interface ConferenceRoomState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined,
}


const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function ConferenceRoomReducer(state = initialState, action: ConferenceAction): ConferenceRoomState {
    switch (action.type) {
        case ConferenceActionTypes.POST_CONFERENCE_ROOM_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                data: undefined,
            };
        case ConferenceActionTypes.POST_CONFERENCE_ROOM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                data: action.data,
            };
        case ConferenceActionTypes.POST_CONFERENCE_ROOM_ERROR:
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

const ConferenceRoomSelector = (store: { conferenceRoom: ConferenceRoomState; }) => store.conferenceRoom;

export const conferenceRoomDataResponse = createSelector(ConferenceRoomSelector, (state) => state.data);
export const conferenceRoomDataError = createSelector(ConferenceRoomSelector, (state) => state.error);
export const isFetchingConferenceRoom = createSelector(ConferenceRoomSelector, (state) => state.isFetching);