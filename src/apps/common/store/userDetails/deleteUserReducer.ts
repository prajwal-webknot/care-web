import { UserDetailsActionTypes, UserDetailsAction } from "./UserDetailsActions";
import { createSelector } from "reselect";
export interface DeleteUserState {
  isFetching: boolean,
  error: boolean | object,
  data: any,
}
const initialState = {
  isFetching: false,
  data: undefined,
  error: false
};

export function DeleteUserReducer(state = initialState, action: UserDetailsAction): DeleteUserState {
  switch (action.type) {
    case UserDetailsActionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UserDetailsActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        error: false,
      };
    case UserDetailsActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data,
        data: undefined
      };
    default:
      return state;
  }
}

const deleteUserSelector = (store: { deleteUser: DeleteUserState; }) => store.deleteUser;
export const deleteUserSelect = createSelector(deleteUserSelector, (state) => state.data);