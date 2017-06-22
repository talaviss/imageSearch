import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from './ImageItem';

const ImageList = (props) => {
  const imageItems = props.images.map(image => <ImageItem key={image.id} image={image} onImageSelect={props.onImageSelect} />);

  return (
    <div className="image-list">{imageItems}</div>
  );
};

ImageList.propTypes = {
  images: PropTypes.array.isRequired
};

ImageList.defaultProps = {
  images: []
};

export default ImageList;
