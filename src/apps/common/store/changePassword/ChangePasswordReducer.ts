import { ChangePasswordAction, ChangePasswordActionTypes } from './ChangePasswordAction';
import { createSelector } from "reselect";

export interface ChangePasswordState {
  isFetching: boolean,
  error: boolean | any,
  data: any | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function ChangePasswordReducer(state = initialState, action: ChangePasswordAction): ChangePasswordState {
  switch (action.type) {
    case ChangePasswordActionTypes.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case ChangePasswordActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case ChangePasswordActionTypes.CHANGE_PASSWORD_ERROR:
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

const changePassSelector = (store: { changePass: ChangePasswordState; }) => store.changePass;

export const changePassSelect = createSelector(changePassSelector, (state) => state);
