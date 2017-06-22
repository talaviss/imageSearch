import React from 'react';
import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';


const HistoryList = (props) => {
  const historyItems = props.history.map(hist => <HistoryItem key={hist.id} data={hist} onRowClick={props.onRowClick} />);

  return (
    <div className="history-list">{historyItems}</div>
  );
};

HistoryList.propTypes = {
  history: PropTypes.arrayOf().isRequired
};

HistoryList.defaultProps = {
  history: []
};

export default HistoryList;
