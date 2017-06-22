import React from 'react';

class ImageItem extends React.Component {
  render() {
    return (
      <div className="image-item">
        <img alt={this.props.image.alt} src={this.props.image.url} onClick={() => this.props.onImageSelect(this.props.image)} />
      </div>
    );
  }
}

export default ImageItem;
