import { createSelector } from 'reselect';
import { RosterAction, RosterActionTypes } from '../actions/RosterAction';

export interface PostRosterState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function PostRosterReducer(state = initialState, action: RosterAction): PostRosterState {
  switch (action.type) {
    case RosterActionTypes.POST_ROSTER_REQUEST:
      return {
        ...state,
        error: false,
        data: undefined,
      };
    case RosterActionTypes.POST_ROSTER_SUCCESS:
      return {
        ...state,
        error: false,
        data: action.data,
      };
    case RosterActionTypes.POST_ROSTER_ERROR:
      return {
        ...state,
        error: true,
        data: action.data,
      };
    default:
      return state;
  }
}

const postRosterSelector = (store: { postRoster: PostRosterState; }) => store.postRoster;

export const postRosterData = createSelector(postRosterSelector, (state) => state.error);
export const postRosterSelect = createSelector(postRosterSelector, (state) => state.data);
