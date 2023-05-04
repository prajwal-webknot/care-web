import {
  HotDeskingActionTypes,
  HotDeskingAction,
} from "../actions/HotDeskingActions";
import { createSelector } from "reselect";

export interface EditHotDeskState {
  isFetching: boolean;
  error: boolean | object;
  data: object | undefined;
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function EditHotDeskingReducer(
  state = initialState,
  action: HotDeskingAction | HotDeskingAction
): EditHotDeskState {
  switch (action.type) {
    case HotDeskingActionTypes.PATCH_HOT_DESKING_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case HotDeskingActionTypes.PATCH_HOT_DESKING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case HotDeskingActionTypes.PATCH_HOT_DESKING_ERROR:
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

const editHotDeskSelector = (store: { editHotDesk: EditHotDeskState }) =>
  store.editHotDesk;

export const editHotDesk = createSelector(
  editHotDeskSelector,
  (state) => state.data
);
export const editHotDeskFull = createSelector(
  editHotDeskSelector,
  (state) => state
);

export const editHotDeskError = createSelector(editHotDeskSelector, state => state.error);