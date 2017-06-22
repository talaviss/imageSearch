/**
 * Created by user on 16/06/2017.
 */
import React from 'react';
import HistoryHeader from './HistoryHeader';
import HistoryList from './HistoryList';

class HistoryWidget extends React.Component {
  render() {
    return (
      <section>
        <div className="tbl-header">
          <h4>Search History</h4>
          <table >
            <HistoryHeader />
            <HistoryList history={this.props.history} onRowClick={this.props.onHistoryRowClick} />
          </table>
          <button className="btn  clearButton btn-sm" title="Clear" onClick={e => this.props.onClearHistoryClick(e)}>Clear</button>
        </div>
      </section>
    );
  }
}

export default HistoryWidget;
