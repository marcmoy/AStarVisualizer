import React from 'react';
import MazeSolver from './components/maze_solver';
import Settings from './components/settings';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <MazeSolver />
        <Settings />
      </div>
    );
  }
}

export default App;
