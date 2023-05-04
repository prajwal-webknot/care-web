
import { LocationRequest, LocationResponse } from './Location.data';

export enum LocationActionTypes {
  LOCATION_REQUEST = "LOCATION_REQUEST",
  LOCATION_SUCCESS = "LOCATION_SUCCESS",
  LOCATION_ERROR = "LOCATION_ERROR",
}

export interface LocationAction {
  type: LocationActionTypes,
  data: LocationRequest | LocationResponse | Error;
}

export class LocationActions {
  public static locationRequest(request: LocationRequest): LocationAction {
    return { type: LocationActionTypes.LOCATION_REQUEST, data: request }
  }
  public static locationSuccess(request: LocationRequest): LocationAction {
    return { type: LocationActionTypes.LOCATION_SUCCESS, data: request }
  }

  public static locationFailure(error: Error): LocationAction {
    return { type: LocationActionTypes.LOCATION_ERROR, data: error }
  }
}

