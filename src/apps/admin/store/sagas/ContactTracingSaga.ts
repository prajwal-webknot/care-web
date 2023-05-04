import { put, takeLatest } from "redux-saga/effects";
import {
  ContactTracingAction,
  ContactTracingActionTypes,
  ContactTracingActions,
} from "../actions/ContactTracingAction";
import ContactTracingService from "../../service/ContactTracingService";
import {
  ContactTracingRequest,
  ContactTracingResponse,
} from "../../../../tsModels/ContactTracing.data";

function* getContactTracingData(
  payload: ContactTracingRequest
): IterableIterator<any> {
  try {
    const response: undefined | ContactTracingResponse =
      yield ContactTracingService.contactTrace(payload);
    yield put(ContactTracingActions.getContactTracingSuccess(response as any));
  } catch (error) {
    yield put(ContactTracingActions.getContactTracingFailure(error));
  }
}

function* authWatcher(): IterableIterator<any> {
  yield takeLatest(
    ContactTracingActionTypes.CONTACT_TRACING_REQUEST,
    (action: ContactTracingAction) =>
      getContactTracingData(action.data as ContactTracingRequest)
  );
}

export default authWatcher;
