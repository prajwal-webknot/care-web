
import { CensusRequest, CensusResponse } from '../../../../tsModels/Census.data';

export enum CensusActionTypes {
  CENSUS_REQUEST = "CENSUS_REQUEST",
  CENSUS_SUCCESS = "CENSUS_SUCCESS",
  CENSUS_ERROR = "CENSUS_ERROR",
}

export interface CensusAction {
  type: CensusActionTypes,
  data: CensusRequest | CensusResponse | Error;
}

export class CensusActions {
  public static censusRequest(request: CensusRequest): CensusAction {
    return { type: CensusActionTypes.CENSUS_REQUEST, data: request }
  }
  public static censusSuccess(request: CensusRequest): CensusAction {
    return { type: CensusActionTypes.CENSUS_SUCCESS, data: request }
  }
  public static censusFailure(error: Error): CensusAction {
    return { type: CensusActionTypes.CENSUS_ERROR, data: error }
  }
}

