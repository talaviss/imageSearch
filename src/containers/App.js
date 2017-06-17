import React from 'react';
import SearchWidget from '../components/SearchWidget';
import SearchHisotry from '../components/SearchHisotry';

import ImageList from '../components/ImageList';
//import Superagent from 'superagent';
import '../styles/App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';


class App extends React.Component {
   constructor() {
      super();
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchText) {
        searchText = searchText.replace(/\s/g, '+');
        console.log(searchText);
    }

    render() {
        return (
          <div>

              <SearchWidget onTermChange={this.props.actions.requestImages} />
              <ImageList images={this.props.images} />
              <SearchHisotry />
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    images: state.images.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
