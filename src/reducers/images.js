import { REQUEST_IMAGES_DATA_RECEIVED } from '../actions/ActionTypes';

const initialState = {
  data: []
};

export default function images(state = initialState, action) {
  switch (action.type) {
  case REQUEST_IMAGES_DATA_RECEIVED:
    return {
      ...state, data: action.data
    };
  default:
    return state;
  }
}
