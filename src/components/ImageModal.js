import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


const GifModal = (props) => {
    console.dir(props);
    if (!props.selectedImage) {
        return <div></div>;
    }

    return (
        <Modal
            contentLabel="Image Modal"
            style={customStyles}
            isOpen={ props.modalIsOpen }
            onRequestClose={ () => props.onRequestClose() }>
            <h1>Alcide image zoom viewer</h1>

            <div className="image-modal">
                <img src={ props.selectedImage.url } alt={props.selectedImage.alt} />
                <p><strong>Source:</strong> {props.selectedImage.url}</p>
                <p><strong>Id:</strong> { props.selectedImage.id }</p>

                <button onClick={() => props.onRequestClose()}>close</button>
            </div>
        </Modal>
    );
};

export default GifModal;
