
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

export function SwapConferenceReducer(
    state = initialState,
    action: ConferenceRoomDetailsAction
): ConferenceRoomDetailsState {
    switch (action.type) {
        case ConferenceRoomDetailsActionTypes.POST_SWAP_CONFERENCE_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                data: undefined,
            };
        case ConferenceRoomDetailsActionTypes.POST_SWAP_CONFERENCE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                data: action.data,
            };
        case ConferenceRoomDetailsActionTypes.POST_SWAP_CONFERENCE_ERROR:
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

const SwapConferenceSelector = (store: { swapConference: ConferenceRoomDetailsState }) =>
    store.swapConference;
export const SwapConferenceResponse = createSelector(
    SwapConferenceSelector,
    (state) => state.data
);
export const SwapConferenceFetching = createSelector(
    SwapConferenceSelector,
    (state) => state.isFetching
);
export const SwapConferenceError = createSelector(
    SwapConferenceSelector,
    (state) => state.error
);