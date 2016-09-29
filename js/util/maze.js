import Tile from './tile';
import Solver from './solver';

class Maze {
  constructor(height = 20, width = 40) {
    this.startPos = [Math.floor(height / 2), Math.floor(width * (1 / 4))];
    this.endPos = [Math.floor(height / 2), Math.floor(width * (3 / 4))];
    this.initializeGrid = this.initializeGrid.bind(this);
    this.initializeGrid(height, width);
    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.toggleWall = this.toggleWall.bind(this);
    this.solve = this.solve.bind(this);
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
    // check if tile is empty before adding wall
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
}

export default Maze;
