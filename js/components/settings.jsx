import React from 'react';

const Settings = ({ toggleStartPicker, toggleEndPicker, startOn, endOn, resetMaze }) => {
  return(
    <div className='settings'>
      <ul>

        <li>
          <button
            onClick={toggleStartPicker}
            className={startOn ? 'active' : ''}>
            Set start node
          </button>
        </li>

        <li>
          <button
            onClick={toggleEndPicker}
            className={endOn ? 'active' : ''}>
            Set end node
          </button>
        </li>

        <li>
          <button onClick={resetMaze}>
            Reset Maze
          </button>
        </li>

        <li>
          <button>
            Solve
          </button>
        </li>

      </ul>
    </div>
  );
};

export default Settings;
