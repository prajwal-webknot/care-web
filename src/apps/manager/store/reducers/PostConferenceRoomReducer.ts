import { createSelector } from 'reselect';
import { ConferenceAction, ConferenceActionTypes } from '../actions/ConferenceAction';

export interface PostConferenceRoomState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined | null,
}


const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function PostConfernceRoomBookReducer(state = initialState, action: ConferenceAction): PostConferenceRoomState {
    switch (action.type) {
        case ConferenceActionTypes.POST_CONFERENCE_ROOM_BOOK_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                data: null,
            };
        case ConferenceActionTypes.POST_CONFERENCE_ROOM_BOOK_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                data: action.data,
            };
        case ConferenceActionTypes.POST_CONFERENCE_ROOM_BOOK_ERROR:
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

const postConferenceRoomBookSelector = (store: { postConferenceRoomBook: PostConferenceRoomState; }) => store.postConferenceRoomBook;

export const postConferenceRoomBookFetching = createSelector(postConferenceRoomBookSelector, (state) => state.isFetching)
export const postConferenceRoomBookError = createSelector(postConferenceRoomBookSelector, (state) => state.error);
export const postConferenceRoomBookResponse = createSelector(postConferenceRoomBookSelector, (state) => state.data);

