import { createSelector } from 'reselect';
import { DateBasedEmployesAction, DateBasedEmployesActionTypes } from '../actions/DateBasedEmployesAction';


export interface DateBasedEmployesState {
    isFetching: boolean,
    error: boolean | object,
    data: object | undefined,
}


const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function DateBasedEmployesReducer(state = initialState, action: DateBasedEmployesAction): DateBasedEmployesState {
    switch (action.type) {
        case DateBasedEmployesActionTypes.DATE_BASED_EMPLOYES_REQUEST:
            return {
                ...state,
                error: false,
                data: undefined,
            };
        case DateBasedEmployesActionTypes.DATE_BASED_EMPLOYES_SUCCESS:
            return {
                ...state,
                error: false,
                data: action.data,
            };
        case DateBasedEmployesActionTypes.DATE_BASED_EMPLOYES_ERROR:
            return {
                ...state,
                error: true,
                data: action.data,
            };
        default:
            return state;
    }
}

const DateBasedEmployesSelector = (store: { dateBasedEmployes: DateBasedEmployesState; }) => store.dateBasedEmployes;

export const DateBasedEmployesResponse = createSelector(DateBasedEmployesSelector, (state) => state.data);
export const isFetching = createSelector(DateBasedEmployesSelector, (state) => state.isFetching);