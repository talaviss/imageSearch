import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchWidget from '../components/SearchWidget';
import HistoryWidget from '../components/HistoryWidget';
import ImageList from '../components/ImageList';
import ImageModal from '../components/ImageModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/App.css';
import * as ImagesActions from '../actions/ImagesActions';
import * as ModalActions from '../actions/ModalActions';
import * as HistoryActions from '../actions/HistoryActions';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <SearchWidget
          searchText={this.props.searchText.term}
          onSearchTextChange={this.props.actions.requestSetSearchText}
          onClickSearch={this.props.actions.requestImages}
        />
        <HistoryWidget
          history={this.props.history}
          onHistoryRowClick={this.props.actions.requestImagesWithTerm}
          onClearHistoryClick={this.props.historyActions.clearHistory}
        />
        <ImageList images={this.props.images} onImageSelect={selectedImage => this.props.modalActions.openModal({ selectedImage })} />
        <ImageModal
          modalIsOpen={this.props.modalIsOpen}
          selectedImage={this.props.selectedImage}
          onRequestClose={() => this.props.modalActions.closeModal()}
        />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.images.data,
    searchText: state.searchText,
    modalIsOpen: state.modal.modalIsOpen,
    selectedImage: state.modal.selectedImage,
    history: state.history.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ImagesActions, dispatch),
    modalActions: bindActionCreators(ModalActions, dispatch),
    historyActions: bindActionCreators(HistoryActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
