import { createSelector } from 'reselect';
import { UserDetailsAction, UserDetailsActionTypes } from './UserDetailsActions';

export interface UserDetailsState {
  isFetching: boolean,
  error: boolean | object,
  data: any,
}

const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
};

export function UserDetailsReducer(state = initialState, action: UserDetailsAction): UserDetailsState {

  switch (action.type) {
    case UserDetailsActionTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      };
    case UserDetailsActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      };
    case UserDetailsActionTypes.USER_DETAILS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      };
    case UserDetailsActionTypes.CLEAR_REDUCER:
      return initialState;
    default:
      return state;
  }
}
const userDetailsSelector = (store: { userDetails: UserDetailsState; }) => store.userDetails;

export const userDetails = createSelector(userDetailsSelector, (state) => state.data);
export const loadingUserDetails = createSelector(userDetailsSelector, (state) => state.isFetching);
