import React from 'react';
import SearchWidget from '../components/SearchWidget';
import SearchHisotry from '../components/SearchHisotry';
import ImageList from '../components/ImageList';
import ImageModal from '../components/ImageModal';
import '../styles/App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImagesActions from '../actions/ImagesActions';
import * as ModalActions from '../actions/ModalActions';

class App extends React.Component {
   constructor() {
      super();
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchText) {
        searchText = searchText.replace(/\s/g, '+');
    }

    render() {
        return (
          <div>
              <SearchWidget onSearchTextChange={this.props.actions.requestSetSearchText}
                           onClickSearch={this.props.actions.requestImages} />
              <ImageList images={this.props.images} onImageSelect={ selectedImage => this.props.modalActions.openModal({selectedImage}) } />
              <ImageModal modalIsOpen={ this.props.modalIsOpen }
                                selectedImage={ this.props.selectedImage }
                                onRequestClose={ () => this.props.modalActions.closeModal() } />

              <SearchHisotry />
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    images: state.images.data,
    searchText: state.searchText,
    modalIsOpen: state.modal.modalIsOpen,
    selectedImage: state.modal.selectedImage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ImagesActions, dispatch),
    modalActions: bindActionCreators(ModalActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
