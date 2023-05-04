import { createSelector } from 'reselect';
import { RosterGuestAction, RosterGuestActionTypes } from '../actions/RosterGuestAction';

export interface PostRosterGuestState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined,
}


const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function PostRosterGuestReducer(state = initialState, action: RosterGuestAction): PostRosterGuestState {
    switch (action.type) {
        case RosterGuestActionTypes.POST_ROSTER_GUEST_REQUEST:
            return {
                ...state,
                error: false,
                data: undefined,
            };
        case RosterGuestActionTypes.POST_ROSTER_GUEST_SUCCESS:
            return {
                ...state,
                error: false,
                data: action.data,
            };
        case RosterGuestActionTypes.POST_ROSTER_GUEST_ERROR:
            return {
                ...state,
                error: true,
                data: action.data,
            };
        default:
            return state;
    }
}

const postRosterGuestSelector = (store: { postRosterGuest: PostRosterGuestState; }) => store.postRosterGuest;

export const postRosterGuestError = createSelector(postRosterGuestSelector, (state) => state.error);
export const postRosterGuestResponse = createSelector(postRosterGuestSelector, (state) => state.data);
