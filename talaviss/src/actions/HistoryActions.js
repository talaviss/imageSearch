import { HISTORY_CLEAR } from '../actiontypes/HistoryActionTypes';

export function clearHistory() {
  return {
    type: HISTORY_CLEAR,
    payload: []
  };
}
