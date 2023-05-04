
import { ExpiredPassesRequest, ExpiredPassesResponse } from '../../../../tsModels/ExpiredPasses.data';

export enum ExpiredPassesActionTypes {
  EXPIRED_PASSES_REQUEST = "EXPIRED_PASSES_REQUEST",
  EXPIRED_PASSES_SUCCESS = "EXPIRED_PASSES_SUCCESS",
  EXPIRED_PASSES_ERROR = "EXPIRED_PASSES_ERROR",
}

export interface ExpiredPassesAction {
  type: ExpiredPassesActionTypes,
  data: ExpiredPassesRequest | ExpiredPassesResponse | Error;
}

export class ExpiredPassesActions {
  public static getExpiredPassesRequest(request: ExpiredPassesRequest): ExpiredPassesAction {
    return { type: ExpiredPassesActionTypes.EXPIRED_PASSES_REQUEST, data: request }
  }
  public static getExpiredPassesSuccess(request: ExpiredPassesRequest): ExpiredPassesAction {
    return { type: ExpiredPassesActionTypes.EXPIRED_PASSES_SUCCESS, data: request }
  }
  public static getExpiredPassesFailure(error: Error): ExpiredPassesAction {
    return { type: ExpiredPassesActionTypes.EXPIRED_PASSES_ERROR, data: error }
  }
}

