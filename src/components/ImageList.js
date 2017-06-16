import React from 'react';
import ImageItem from './ImageItem';

const ImageList = (props) => {
  const imageItems = props.images.map((image) => {
    return <ImageItem key={image.id} gif={image} />
  });

  return (
      <div className="image-list">{imageItems}</div>
  );
};

export default ImageList;
