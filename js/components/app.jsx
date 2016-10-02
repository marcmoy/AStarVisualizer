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
      solving: false
    };
    this.resetGrid = this.resetGrid.bind(this);
    this.solve = this.solve.bind(this);
    this.clearWalls = this.clearWalls.bind(this);
    this.clearPath = this.clearPath.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentWillMount() {
    this.resetGrid();
  }

  componentDidMount() {
    document.addEventListener('mouseup', () => {
      this.setState({ startDrag: false, endDrag: false, wallDrag: false });
    });
  }

  resetGrid() {
    if (this.state.solving) return;
    let grid = initialGrid();
    let height = grid.length;
    let width = grid[0].length;
    let startPos = [ Math.floor(height * 0.5), Math.floor(width * (1/10)) ];
    let endPos = [ Math.floor(height * 0.5), Math.floor(width * (9/10)) ];
    grid[startPos[0]][startPos[1]].className = 'start';
    grid[endPos[0]][endPos[1]].className = 'end';
    this.setState({ grid: grid, startPos: startPos, endPos: endPos });
  }

  clearWalls() {
    if (this.state.solving) return;
    let clearedGrid = clearGrid(this.state.grid, ['wall']);
    this.setState({ grid: clearedGrid });
  }

  clearPath() {
    if (this.state.solving) return;
    let clearedGrid = clearGrid(this.state.grid, ['path','open','closed']);
    this.setState({ grid: clearedGrid });
    $('td.open').removeClass('open').addClass('empty');
    $('td.closed').removeClass('closed').addClass('empty');
  }

  solve() {
    this.setState({ solving: true });
    let grid = cloneGrid(this.state.grid);
    let steps = [];
    let recordStep = step => steps.push(step);
    aStarSolver(grid, this.state.startPos, this.state.endPos, recordStep);
    this.animateSteps(grid, steps);
  }

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
          resetGrid={this.resetGrid}
          clearWalls={this.clearWalls}
          clearPath={this.clearPath}
          solve={this.solve}
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
