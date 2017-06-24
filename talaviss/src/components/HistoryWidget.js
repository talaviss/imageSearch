/**
 * Created by user on 16/06/2017.
 */
import React from 'react';
import HistoryHeader from './HistoryHeader';
import HistoryList from './HistoryList';
import reactCSS from 'reactcss'


class HistoryWidget extends React.Component {
  render() {
    //Define styles and attach them to the JSX via inline styles:
    const styles = reactCSS({
      'default': {
        header: {
          fontSize: '18px',
          color: '#666666',
          fontWeight: '200',
          marginLeft: '5px',
        },
      }
    }, this.props)
    return (
      <section>
        <div style={styles.header}>
          <h4>History Searches:</h4>
        </div>
        <table className="pretty-table">
          <HistoryHeader />
          <HistoryList history={this.props.history} onRowClick={this.props.onHistoryRowClick} />
        </table>
        <button className="btn-primary clearButton btn-sm" title="Clear" onClick={e => this.props.onClearHistoryClick(e)}>Clear</button>
      </section>
    );
  }
}

export default HistoryWidget;
