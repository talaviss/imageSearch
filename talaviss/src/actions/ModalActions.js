import { OPEN_MODAL, CLOSE_MODAL } from '../actiontypes/ModalActionTypes';

export function openModal(image) {
  return {
    type: OPEN_MODAL,
    image
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
