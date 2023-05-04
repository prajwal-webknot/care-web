
import { createSelector } from "reselect";
import { BlockConferenceRoomAction, BlockConferenceRoomActionTypes } from "../actions/BlockConferenceRoomAction";

export interface BlockConferenceRoomState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
}

const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function BlockConferenceRoomReducer(
    state = initialState,
    action: BlockConferenceRoomAction
): BlockConferenceRoomState {
    switch (action.type) {
        case BlockConferenceRoomActionTypes.BLOCK_CONFERENCE_ROOM_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                data: undefined,
            };
        case BlockConferenceRoomActionTypes.BLOCK_CONFERENCE_ROOM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                data: action.data,
            };
        case BlockConferenceRoomActionTypes.BLOCK_CONFERENCE_ROOM_ERROR:
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

const BlockConferenceRoomSelector = (store: { blockConferenceRoom: BlockConferenceRoomState }) =>
    store.blockConferenceRoom;
export const BlockConferenceRoomResponse = createSelector(
    BlockConferenceRoomSelector,
    (state) => state.data
);
export const BlockConferenceRoomError = createSelector(
    BlockConferenceRoomSelector,
    (state) => state.error
);
export const BlockConferenceRoomFetching = createSelector(
    BlockConferenceRoomSelector,
    (state) => state.isFetching
);