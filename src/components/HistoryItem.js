import React from 'react';

const HistoryItem = (props) => {

  return (
    <tr onClick={e => props.onRowClick(props.data.term)}>
      <td>
        { props.data.term }
      </td>
      <td>
        { props.data.service }
      </td>
      <td>
        { props.data.time }
      </td>
      <td>
        { props.data.count }
      </td>
    </tr>
  );
};

export default HistoryItem;
