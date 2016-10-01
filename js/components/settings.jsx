import React from 'react';

const Settings = ({ resetGrid, clearWalls, clearPath, solve, solving }) => {
  return(
    <div className='settings'>
      <ul>
        <li><button onClick={resetGrid} disabled={solving}>Reset grid</button></li>
        <li><button onClick={clearWalls} disabled={solving}>Clear walls</button></li>
        <li><button onClick={clearPath} disabled={solving}>Clear path</button></li>
        <li><button onClick={solve} disabled={solving}> Solve </button></li>
      </ul>
    </div>
  );
};

export default Settings;
