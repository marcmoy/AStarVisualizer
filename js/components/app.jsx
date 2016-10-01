import React from 'react';
import Settings from './settings';
import aStarSolver from '../util/a_star_solver';
import { tracePath } from '../util/a_star_solver';

const initialGrid = (height = 20, width = 40) => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      let node = { className: 'empty', pos: [i,j] };
      row.push(node);
    }
    grid.push(row);
  }
  return grid;
};

class App extends React.Component {
  constructor() {
    super();
    this.state = { startDrag: false, endDrag: false, wallDrag: false };
    this.setUp = this.setUp.bind(this);
    this.solve = this.solve.bind(this);
    this.clearNode = this.clearNode.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  componentWillMount() {
    this.setUp();
  }

  componentDidMount() {
    document.addEventListener('mouseup', () => {
      this.setState({ startDrag: false, endDrag: false, wallDrag: false });
    });
  }

  setUp() {
    let grid = initialGrid();
    let height = grid.length;
    let width = grid[0].length;
    let startPos = [ Math.floor(height * 0.5), Math.floor(width * (1/10)) ];
    let endPos = [ Math.floor(height * 0.5), Math.floor(width * (9/10)) ];
    grid[startPos[0]][startPos[1]].className = 'start';
    grid[endPos[0]][endPos[1]].className = 'end';
    this.setState({ grid: grid, startPos: startPos, endPos: endPos });
  }

  clearNode() {
    let ignore = ['wall', 'path', 'open', 'closed'];
    let clearedGrid = this.state.grid.map(row => {
      return row.map(node => {
        let name = node.className;
        node.className = ignore.includes(name) ? 'empty' : name;
        return node;
      });
    });
    this.setState({ grid: clearedGrid });
  }

  solve() {
    let grid = this.state.grid;
    let solvedGrid = aStarSolver(grid, this.state.startPos, this.state.endPos);
    this.setState({ grid: solvedGrid });
  }

  handleMouseDown(e) {
    e.preventDefault();
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
    return e.target.attributes.value.value.split(',').map(i => parseInt(i));
  }

  handleMouseOver(e) {
    e.preventDefault();
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
            value={node.pos} key={node.pos}
            onMouseDown={this.handleMouseDown}
            onMouseOver={this.handleMouseOver}
            />
        );
      }
      table.push(<tr key={i}>{nodes}</tr>);
    }

    return(
      <div>
        <h1 className='title'>Shortest Path Visualizer</h1>
        <h2 className='author'>by Marc Moy</h2>
        <div className='grid'>
          <table>
            <tbody>
              {table}
            </tbody>
          </table>
        </div>
        <Settings
          resetGrid={this.setUp}
          clearNode={this.clearNode}
          solve={this.solve}
        />
      </div>
    );
  }
}

export default App;
