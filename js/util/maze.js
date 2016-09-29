import Tile from './tile';
import Solver from './solver';

export const initialGrid = (height = 20, width = 40) => {
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

class Maze {
  constructor(height = 20, width = 40) {
    this.startPos = [Math.floor(height * (9/10)), Math.floor(width * (1/12))];
    this.endPos = [Math.floor(height*(1/10)), Math.floor(width * (11/12))];
    this.initializeGrid = this.initializeGrid.bind(this);
    this.initializeGrid(height, width);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.toggleWall = this.toggleWall.bind(this);
    this.solve = this.solve.bind(this);
    this.tracePath = this.tracePath.bind(this);
  }

  initializeGrid(height, width) {
    let grid = [];
    for (let x = 0; x < height; x++) {
      let row = [];
      for (let y = 0; y < width; y++) {
        row[y] = new Tile([x,y]);
      }
      grid.push(row);
    }

    this.grid = grid;
    this.setStart(this.startPos);
    this.setEnd(this.endPos);
  }

  toggleWall(pos) {
    let tile = this.grid[pos[0]][pos[1]];
    if (tile.className.includes('empty')) {
      tile.removeClass('empty');
      tile.addClass('wall');
    } else if (tile.className.includes('wall')) {
      tile.removeClass('wall');
      tile.addClass('empty');
    }
  }

  setStart(pos) {
    if (this.startTile) this.startTile.className = 'empty';
    this.startPos = pos;
    let startTile = this.grid[this.startPos[0]][this.startPos[1]];
    startTile.className = 'start';
    this.startTile = startTile;
  }

  setEnd(pos) {
    if (this.endTile) this.endTile.className = 'empty';
    this.endPos = pos;
    let endTile = this.grid[this.endPos[0]][this.endPos[1]];
    endTile.className = 'end';
    this.endTile = endTile;
  }

  solve(result) {
    let solver = new Solver(this);
    solver.solveMaze(result);
  }

  tracePath(tile, result) {
    if (tile.className === 'start') return;
    if (tile.className !== 'end') tile.className = 'path';
    result(this);
    this.tracePath(tile.parent, result);
  }
}

export default Maze;
