import { createSelector } from 'reselect';
import { MultidayRosterAction, MultidayRosterActionTypes } from '../actions/MultidayRosterAction';

export interface MultidayRosterState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined,
}


const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function MultidayRosterReducer(state = initialState, action: MultidayRosterAction): MultidayRosterState {
    switch (action.type) {
        case MultidayRosterActionTypes.POST_MULTIDAY_ROSTER_REQUEST:
            return {
                ...state,
                error: false,
                data: undefined,
            };
        case MultidayRosterActionTypes.POST_MULTIDAY_ROSTER_SUCCESS:
            return {
                ...state,
                error: false,
                data: action.data,
            };
        case MultidayRosterActionTypes.POST_MULTIDAY_ROSTER_ERROR:
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

const multidayRosterSelector = (store: { multidayRoster: MultidayRosterState; }) => store.multidayRoster;

export const postMultidayRosterResponse = createSelector(multidayRosterSelector, (state) => state.data);
export const postMultidayRosterError = createSelector(multidayRosterSelector, (state) => state.error);
export const isFetching = createSelector(multidayRosterSelector, (state) => state.isFetching); 