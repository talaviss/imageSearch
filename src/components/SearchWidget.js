import React from 'react';

class SearchWidget extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onSearchTermChange(term) {

        this.setState({term});

    }

    performSearch() {
        console.log('i have been clicked!');
        this.props.onTermChange(this.state.term);
    }

    render() {
        return (
            <div className="search">
                <input placeholder="Enter text to fetch images"  onChange={event => this.onSearchTermChange(event.target.value)} />
                <input type="button" onClick={event => this.performSearch()} />
            </div>
        );
    }
}

export default SearchWidget;
