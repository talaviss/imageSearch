import { REQUEST_SET_TERM } from '../actions/ActionTypes';

const initialState = {
  term: ''
};

export default function images(state = initialState, action) {
  switch (action.type) {
  case REQUEST_SET_TERM:
    return {
      ...state, term: action.payload
    };
  default:
    return state;
  }
}
