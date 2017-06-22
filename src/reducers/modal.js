import { OPEN_MODAL, CLOSE_MODAL } from '../actions/ActionTypes';

const initialState = {
  selectedImage: null,
  modalIsOpen: false
};

export default function modal(state = initialState, action) {
  switch (action.type) {
  case OPEN_MODAL:
    return {
      ...state,
      modalIsOpen: true,
      selectedImage: action.image.selectedImage
    };
  case CLOSE_MODAL:
    return {
      ...state,
      modalIsOpen: false,
      selectedImage: null
    };
  default:
    return state;
  }
}
