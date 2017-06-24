import { REQUEST_IMAGES_DATA_ERROR } from '../actiontypes/ImagesActionTypes';

const initialState = {
  error: null
};

export default function images(state = initialState, action) {
  switch (action.type) {
  case REQUEST_IMAGES_DATA_ERROR:
    return {
      ...state, error: action.error
    };
  default:
    return state;
  }
}
