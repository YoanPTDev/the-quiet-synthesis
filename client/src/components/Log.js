import React from 'react';

function Log({ logs }) {
  return (
    <div>
      {logs.map((logItem) => {
        const { weekNb } = logItem;
      })}
    </div>
  );
}

export default Log;
