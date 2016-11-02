import React from 'react';
import Settings from './settings';
import Introduction from './introduction';
import aStarSolver from '../util/a_star_solver';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      startDrag: false,
      endDrag: false,
      wallDrag: false,
      solving: false,
      solved: false
    };
    this.createGrid = this.createGrid.bind(this);
    this.resetMaze = this.resetMaze.bind(this);
    this.randomWalls = this.randomWalls.bind(this);
    this.solve = this.solve.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentWillMount() {
    this.createGrid();
  }

  componentDidMount() {
    document.addEventListener('mouseup', () => {
      this.setState({ startDrag: false, endDrag: false, wallDrag: false });
    });
  }

  createGrid() {
    if (this.state.solving) return;
    let grid = initialGrid();
    let height = grid.length;
    let width = grid[0].length;
    let startPos = [ Math.floor(height * 0.5), Math.floor(width * (1/10)) ];
    let endPos = [ Math.floor(height * 0.5), Math.floor(width * (9/10)) ];
    grid[startPos[0]][startPos[1]].className = 'start';
    grid[endPos[0]][endPos[1]].className = 'end';
    this.setState({
      grid: grid,
      startPos: startPos,
      endPos: endPos,
      solved: false
    });
  }

  resetMaze() {
    let grid = this.state.grid;
    let startPos = this.state.startPos;
    let endPos = this.state.endPos;

    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      for (let j = 0; j < row.length; j++) {
        if (i === startPos[0] && j === startPos[1]) continue;
        if (i === endPos[0] && j === endPos[1]) continue;
        grid[i][j].className = 'empty';
      }
    }
    this.setState({ grid: grid, solved: false });
  }

  randomWalls() {
    let grid = this.state.grid;
    let startPos = this.state.startPos;
    let endPos = this.state.endPos;

    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      for (let j = 0; j < row.length; j++) {
        if (i === startPos[0] && j === startPos[1]) continue;
        if (i === endPos[0] && j === endPos[1]) continue;
        let option = Math.random() < 0.3 ? 'wall' : 'empty';
        grid[i][j].className = option;
      }
    }
    this.setState({ grid: grid, solved: false });
  }

  solve() {
    this.setState({ solving: true });
    let grid = cloneGrid(this.state.grid);
    let steps = [];
    let recordStep = step => steps.push(step); // part of animation feature
    aStarSolver(grid, this.state.startPos, this.state.endPos, recordStep);
    this.setState({ grid: grid, solving: false, solved: true });
  }

  // Animation is too slow. Remove this feature until it looks cleaner
  animateSteps(grid, steps) {
    let i = 0;
    let max = steps.length;

    this.interval = setInterval(() => {
      if (i < max) {
        let node = steps[i];
        let pos = node.pos.join(',');
        document.getElementById(pos).className = node.className;
        i++;
      } else {
        this.setState({ grid: grid, solving: false });
        clearInterval(this.interval);
      }
    }, 1);
  }

  handleMouseDown(e) {
    e.preventDefault();
    if (this.state.solving) return;
    let type = e.target.className;
    let grid = this.state.grid;
    switch (type) {
      case 'start':
        return this.setState({ startDrag: true, endDrag: false });
      case 'end':
        return this.setState({ startDrag: false, endDrag: true });
      case 'empty':
        let emptyPos = this.grabPos(e);
        grid[emptyPos[0]][emptyPos[1]].className = 'wall';
        return this.setState({ grid: grid, wallDrag: true });
      case 'wall':
        let wallPos = this.grabPos(e);
        grid[wallPos[0]][wallPos[1]].className = 'empty';
        return this.setState({ grid: grid });
      default:
        return;
    }
  }

  grabPos(e) {
    return e.target.dataset.value.split(',').map(i => parseInt(i));
  }

  handleMouseOver(e) {
    e.preventDefault();
    if (this.state.solving) return;
    let pos = this.grabPos(e);
    let grid = this.state.grid;
    let node = grid[pos[0]][pos[1]];

    if (this.state.startDrag) {
      let startPos = this.state.startPos;
      grid[startPos[0]][startPos[1]].className = 'empty';
      node.className = 'start';
      return this.setState({ grid: grid, startPos: pos });

    } else if (this.state.endDrag) {
      let endPos = this.state.endPos;
      grid[endPos[0]][endPos[1]].className = 'empty';
      node.className = 'end';
      return this.setState({ grid: grid, endPos: pos });

    } else if (this.state.wallDrag ) {
      if (node.className === 'start' || node.className === 'end') return;
      node.className = 'wall';
      return this.setState({ grid: grid });
    }
  }

  render() {
    let grid = this.state.grid;
    let table = [];
    for (let i = 0; i < grid.length; i++) {
      let nodes = [];
      for (let j = 0; j < grid[i].length; j++) {
        let node = grid[i][j];
        nodes.push(
          <td
            className={node.className}
            id={node.pos} key={node.pos}
            data-value={node.pos}
            onMouseDown={this.handleMouseDown}
            onMouseOver={this.handleMouseOver}
            />
        );
      }
      table.push(<tr key={i}>{nodes}</tr>);
    }

    return(
      <div className='container'>
        <Introduction/>
        <div className='grid'>
          <table>
            <tbody>
              {table}
            </tbody>
          </table>
        </div>
        <Settings
          resetMaze={this.resetMaze}
          randomWalls={this.randomWalls}
          solve={this.solve}
          solved={this.state.solved}
          solving={this.state.solving}
        />
      </div>
    );
  }
}

const cloneGrid = grid => {
  let clone = [];
  for (let i = 0; i < grid.length; i++) {
    let row = [];
    for (let j = 0; j < grid[i].length; j++) {
      let node = Object.assign({}, grid[i][j]);
      row.push(node);
    }
    clone.push(row);
  }
  return clone;
};

const windowHeight = $(window).height();
const windowWidth = $(window).width();
const intialHeight = windowHeight * 0.85 / 20;
const intialWidth = windowWidth / 20;

const initialGrid = () => {
  let grid = [];
  for (let i = 0; i < intialHeight; i++) {
    let row = [];
    for (let j = 0; j < intialWidth; j++) {
      let node = { className: 'empty', pos: [i,j] };
      row.push(node);
    }
    grid.push(row);
  }
  return grid;
};

const clearGrid = (grid, [names]) => {
  let clearedGrid = grid.map(row => {
    return row.map(node => {
      let name = node.className;
      node.className = names.includes(name) ? 'empty' : name;
      return node;
    });
  });
  return clearedGrid;
};

export default App;
