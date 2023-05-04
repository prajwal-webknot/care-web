import { createSelector } from 'reselect';
import { RosterAction, RosterActionTypes } from '../actions/RosterAction';

export interface RosterState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function RosterReducer(state = initialState, action: RosterAction): RosterState {
  switch (action.type) {
    case RosterActionTypes.GET_ROSTER_REQUEST:
      return {
        ...state,
        error: false,
        data: undefined,
      };
    case RosterActionTypes.GET_ROSTER_SUCCESS:
      return {
        ...state,
        error: false,
        data: action.data,
      };
    case RosterActionTypes.GET_ROSTER_ERROR:
      return {
        ...state,
        error: true,
        data: action.data,
      };
      // case RosterActionTypes.GET_ROSTER_DATA:
      // return {
      //   ...state,
      //   error: true,
      //   data: action.data,
      // };
    default:
      return state;
  }
}

const rosterSelector = (store: { roster: RosterState; }) => store.roster;

export const rosterDataSelect = createSelector(rosterSelector, (state) => state.data);
export const isFetching = createSelector(rosterSelector, (state) => state.isFetching);