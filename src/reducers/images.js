import {REQUEST_IMAGES_DATA_RECEIVED}  from '../actions/ActionTypes';

const initialState =  {
  data: [],
};

export default function images(state = initialState, action) {
 //console.dir(action);
  switch (action.type) {
    case REQUEST_IMAGES_DATA_RECEIVED:
      console.dir(action);
      return {
        ...state, data: action.data
      };
    default:
      return state;
  }
}
