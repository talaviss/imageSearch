import React from 'react';

class SearchWidget extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
        this.handleClick = this.handleClick.bind(this);
    }

    onSearchTermChange(term) {

        this.setState({term});

    }

    handleClick() {
        console.log('i have been clicked!');
        this.props.onTermChange(this.state.term);
    }

    render() {
        return (
            <div className="search">
                <input type="text"  placeholder="Enter text to search images"  onChange={event => this.onSearchTermChange(event.target.value)} />
                <button className="btn btn-primary" title="Perform search"  onClick={(e) => this.handleClick(e)}>Search</button>
            </div>
        );
    }
}

export default SearchWidget;
