import * as commandActions from '../actions/CommandActions';

const initialState =  {
  data: []
};

export default function gifs(state = initialState, action) {

  switch (action.type) {

    case commandActions.REQUEST_IMAGES_DATA_RECEIVED:
      console.dir(action);
      return {
        ...state, data: action.data
      };
    default:
      return state;
  }
}
