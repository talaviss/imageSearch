import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


const ImageModal = (props) => {
  if (!props.selectedImage) {
    return <div />;
  }

  return (
    <Modal
      contentLabel="Image Modal"
      style={customStyles}
      isOpen={props.modalIsOpen}
      onRequestClose={() => props.onRequestClose()}
    >
      <h1 className="image-modal-header">Image viewer</h1>

      <div className="image-modal">
        <img src={props.selectedImage.url} alt={props.selectedImage.alt} />
        <p className="firstData"><strong>Url:</strong> {props.selectedImage.url}</p>
        <p><strong>Id:</strong> { props.selectedImage.id }</p>
        <button className="btn-primary btn-sm" onClick={() => props.onRequestClose()}>close</button>
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default ImageModal;
