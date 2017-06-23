import React from 'react';
//import PropTypes from 'prop-types';
import HistoryItem from './HistoryItem';


const HistoryList = (props) => {
  const historyItems = props.history.map(hist => <HistoryItem key={hist.id} data={hist} onRowClick={props.onRowClick} />);

  return (
    <tbody className="history-list">{historyItems}</tbody>
  );
};

export default HistoryList;
