import { put, takeLatest } from "redux-saga/effects";
import {
  UserDetailsAction,
  UserDetailsActions,
  UserDetailsActionTypes,
} from "./UserDetailsActions";
import UserDetailsService from "./UserDetailsService";
import { UserDetailsRequest, UserDetailsResponse, DeleteUserRequest, DeleteUserResponse } from "./UserDetails.data";

function* userDetails(payload: UserDetailsRequest): IterableIterator<any> {
  try {
    const response: undefined | UserDetailsResponse = yield UserDetailsService.userDetails(payload);
    yield put(UserDetailsActions.userDetailsSuccess(response as any));
  } catch (error) {
    yield put(UserDetailsActions.userDetailsFailure(error));
  }
}

function* deleteUser(payload: DeleteUserRequest): IterableIterator<any> {
  try {
    const response: undefined | DeleteUserResponse = yield UserDetailsService.deleteUser(payload);
    yield put(UserDetailsActions.deleteUserSuccess(response as any));
  } catch (error) {
    yield put(UserDetailsActions.deleteUserFailure(error));
  }
}

function* userDetailsWatcher(): IterableIterator<any> {
  yield takeLatest(UserDetailsActionTypes.USER_DETAILS_REQUEST, (action: UserDetailsAction) => userDetails(action.data as UserDetailsRequest));
  yield takeLatest(UserDetailsActionTypes.DELETE_USER_REQUEST, (action: UserDetailsAction) => deleteUser(action.data as DeleteUserRequest));
}

export default userDetailsWatcher;
