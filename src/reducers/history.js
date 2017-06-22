import { HISTORY_DATA, HISTORY_CLEAR } from '../actions/ActionTypes';

const initialState = {
  data: []
};

export default function logHistory(state = initialState, action) {
  switch (action.type) {
  case HISTORY_DATA:
    return {
      ...state,
      data: [...state.data, action.payload]
    };
  case HISTORY_CLEAR:
    return {
      ...state, data: []
    };
  default:
    return state;
  }
}
