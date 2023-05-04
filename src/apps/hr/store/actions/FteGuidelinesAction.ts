
import { GetFteGuidelinesRequest, GetFteGuidelinesResponse, SetFteGuidelinesResponse, SetFteGuidelinesRequest } from '../../../../tsModels/FteGuidelines.data';

export enum FteGuidelinesActionTypes {
  SET_FTE_GUIDELINES_REQUEST = "SET_FTE_GUIDELINES_REQUEST",
  SET_FTE_GUIDELINES_SUCCESS = "SET_FTE_GUIDELINES_SUCCESS",
  SET_FTE_GUIDELINES_ERROR = "SET_FTE_GUIDELINES_ERROR",
  GET_FTE_GUIDELINES_REQUEST = "GET_FTE_GUIDELINES_REQUEST",
  GET_FTE_GUIDELINES_SUCCESS = "GET_FTE_GUIDELINES_SUCCESS",
  GET_FTE_GUIDELINES_ERROR = "GET_FTE_GUIDELINES_ERROR",
  CLEAR_FTE_GUIDELINE_REDUCER = "CLEAR_FTE_GUIDELINE_REDUCER"

}

export interface GetFteGuidelinesAction {
  type: FteGuidelinesActionTypes,
  data?: GetFteGuidelinesRequest | GetFteGuidelinesResponse | Error;
}
export interface SetFteGuidelinesAction {
  type: FteGuidelinesActionTypes,
  data?: SetFteGuidelinesRequest | SetFteGuidelinesResponse | Error;
}

export interface ClearReducerAction {
  type: FteGuidelinesActionTypes;
}

export class FteGuidelinesActions {
  public static getFteGuidelinesRequest(request: GetFteGuidelinesRequest): GetFteGuidelinesAction {
    return { type: FteGuidelinesActionTypes.GET_FTE_GUIDELINES_REQUEST, data: request };
  }
  public static getFteGuidelinesSuccess(request: GetFteGuidelinesRequest): GetFteGuidelinesAction {
    return { type: FteGuidelinesActionTypes.GET_FTE_GUIDELINES_SUCCESS, data: request };
  }
  public static getFteGuidelinesFailure(error: Error): GetFteGuidelinesAction {
    return { type: FteGuidelinesActionTypes.GET_FTE_GUIDELINES_ERROR, data: error };
  }
  public static setFteGuidelinesRequest(request: SetFteGuidelinesRequest): SetFteGuidelinesAction {
    return { type: FteGuidelinesActionTypes.SET_FTE_GUIDELINES_REQUEST, data: request };
  }
  public static setFteGuidelinesSuccess(request: SetFteGuidelinesRequest): SetFteGuidelinesAction {
    return { type: FteGuidelinesActionTypes.SET_FTE_GUIDELINES_SUCCESS, data: request };
  }
  public static setFteGuidelinesFailure(error: Error): SetFteGuidelinesAction {
    return { type: FteGuidelinesActionTypes.SET_FTE_GUIDELINES_ERROR, data: error };
  }
  public static clearFteGuidelinesReducer(): ClearReducerAction {
    return { type: FteGuidelinesActionTypes.CLEAR_FTE_GUIDELINE_REDUCER };
  }
}
