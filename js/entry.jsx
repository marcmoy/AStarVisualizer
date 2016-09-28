import React from 'react';
import ReactDOM from 'react-dom';
import MazeSolver from './components/maze_solver';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<MazeSolver />, root);
});
