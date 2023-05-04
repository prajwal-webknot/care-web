import { createSelector } from 'reselect';
import { CensusAction, CensusActionTypes } from './CensusAction';

export interface CensusState {
  isFetching: boolean,
  error: boolean | object,
  data: object | undefined,
}


const initialState = {
  isFetching: false,
  error: false,
  data: undefined,
}

export function CensusReducer(state = initialState, action: CensusAction): CensusState {
  switch (action.type) {
    case CensusActionTypes.CENSUS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
        data: undefined,
      }
    case CensusActionTypes.CENSUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        data: action.data,
      }
    case CensusActionTypes.CENSUS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        data: action.data,
      }
    default:
    return state
  }
}

const censusSelector = (store: { census: CensusState }) => store.census;
export const censusResp = createSelector(censusSelector, (state) => state.data)
export const isFetchingCensus = createSelector(censusSelector, (state) => state.isFetching)
