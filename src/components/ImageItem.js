import React from 'react';

const ImageItem = (image) => {
  return (
      <div className="gif-item">
         <img alt={image.gif.alt} src={image.gif.url} />
      </div>
  )
};

export default ImageItem;
