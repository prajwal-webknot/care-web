
import { createSelector } from "reselect";
import { ExpectedVisitorsAction, ExpectedVisitorsActionTypes } from "../actions/ExpectedVisitorsAction";

export interface EditExpectedVisitorState {
    isFetching: boolean;
    error: boolean | object;
    data: object | undefined;
}

const initialState = {
    isFetching: false,
    error: false,
    data: undefined,
};

export function EditExpectedVisitorsReducer(
    state = initialState,
    action: ExpectedVisitorsAction | ExpectedVisitorsAction
): EditExpectedVisitorState {
    switch (action.type) {
        case ExpectedVisitorsActionTypes.EXPECTED_VISITORS_EDIT_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false,
                data: undefined,
            };
        case ExpectedVisitorsActionTypes.EXPECTED_VISITORS_EDIT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                error: false,
                data: action.data,
            };
        case ExpectedVisitorsActionTypes.EXPECTED_VISITORS_EDIT_ERROR:
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

const editExpectedVisitorSelector = (store: { editExpectedVisitors: EditExpectedVisitorState }) =>
    store.editExpectedVisitors;

export const editExpectedVisitorResponse = createSelector(
    editExpectedVisitorSelector,
    (state) => state.data
);
export const editExpectedVisitorFullResponse = createSelector(
    editExpectedVisitorSelector,
    (state) => state
);

export const editExpectedVisitorError = createSelector(editExpectedVisitorSelector, state => state.error);