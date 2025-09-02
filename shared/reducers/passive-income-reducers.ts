import type { Holding } from "shared/types/passive-income-types";

export const initialState: ReducerState = {
  holdings: [],
  error: null,
};

export type ReducerState = {
  holdings: Array<Holding>;
  error: string | null;
};
export enum ActionTypes {
  ADD_HOLDING,
  API_ERROR,
  BATCH_ADD_HOLDINGS,
  REMOVE_HOLDING,
}

function portfolioReducer(state: ReducerState, action: any): ReducerState {
  switch (action.type) {
    case ActionTypes.ADD_HOLDING:
      return { ...state, holdings: [...state.holdings, action.payload] };
    case ActionTypes.API_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.BATCH_ADD_HOLDINGS:
      return { ...state, holdings: [...state.holdings, ...action.payload] };
    case ActionTypes.REMOVE_HOLDING:
      return {
        ...state,
        holdings: state.holdings.filter(
          (h: Holding) => h.symbol !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default portfolioReducer;
