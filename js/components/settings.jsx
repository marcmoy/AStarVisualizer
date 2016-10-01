import React from 'react';

const Settings = ({ resetGrid, clearNode, solve }) => {
  return(
    <div className='settings'>
      <ul>
        <li><button onClick={resetGrid}>Reset grid</button></li>
        <li><button onClick={clearNode} value={'wall'}>Clear walls</button></li>
        <li><button onClick={solve}> Solve </button></li>
      </ul>
    </div>
  );
};

export default Settings;
