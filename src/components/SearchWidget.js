import React from 'react';
import PropTypes from 'prop-types';

class SearchWidget extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  onSearchTermChange(term) {
    this.props.onSearchTextChange(term);
  }

  handleClick() {
    this.props.onClickSearch();
  }

  render() {
    return (
      <div className="search">
        <input type="text"  value={this.props.searchText} placeholder="Enter text to search images" onChange={event => this.onSearchTermChange(event.target.value)} />
        <button className="btn btn-primary" title="Perform search" onClick={e => this.handleClick(e)}>Search</button>
      </div>
    );
  }
}

SearchWidget.propTypes = {
  onSearchTextChange: PropTypes.func.isRequired,
  onClickSearch: PropTypes.func.isRequired,
  searchText: PropTypes.string
};

SearchWidget.defaultProps = {
  searchText: ''
};

export default SearchWidget;
