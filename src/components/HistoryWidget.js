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
          <h4>History Searches:</h4>
        </div>
        <table className="pretty-table">
          <HistoryHeader />
          <HistoryList history={this.props.history} onRowClick={this.props.onHistoryRowClick} />
        </table>
        <button className="btn-primary  clearButton btn-sm" title="Clear" onClick={e => this.props.onClearHistoryClick(e)}>Clear</button>
      </section>
    );
  }
}

export default HistoryWidget;
