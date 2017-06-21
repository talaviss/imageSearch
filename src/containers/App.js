import React from 'react';
import SearchWidget from '../components/SearchWidget';
import SearchHisotry from '../components/SearchHisotry';
import ImageList from '../components/ImageList';
import '../styles/App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/ImagesActions';


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
              <ImageList images={this.props.images} />
              <SearchHisotry />
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    images: state.images.data,
    searchText: state.searchText
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
