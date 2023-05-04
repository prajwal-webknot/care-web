import { createSelector } from 'reselect';
import { SearchEmployAction, SearchEmployActionTypes } from '../actions/SearchEmployAction';


export interface SearchEmployState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined,
}


const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function SearchEmployReducer(state = initialState, action: SearchEmployAction): SearchEmployState {
    switch (action.type) {
        case SearchEmployActionTypes.SEARCH_EMPLOY_REQUEST:
            return {
                ...state,
                error: false,
                data: undefined,
            };
        case SearchEmployActionTypes.SEARCH_EMPLOY_SUCCESS:
            return {
                ...state,
                error: false,
                data: action.data,
            };
        case SearchEmployActionTypes.SEARCH_EMPLOY_ERROR:
            return {
                ...state,
                error: true,
                data: action.data,
            };
        default:
            return state;
    }
}

const searchEmploySelector = (store: { searchEmploy: SearchEmployState; }) => store.searchEmploy;

export const SearchEmployResponse = createSelector(searchEmploySelector, (state) => state.data);
export const isFetching = createSelector(searchEmploySelector, (state) => state.isFetching);