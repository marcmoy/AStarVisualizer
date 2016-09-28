import Tile from './tile';

class Maze {
  constructor(height = 40, width = 60) {
    this.open = [];
    this.close = [];
    this.startPos = [height / 2, width * (1 / 4)];
    this.endPos = [height / 2, width * (3 / 4)];
    this.initializeGrid = this.initializeGrid.bind(this);
    this.grid = this.initializeGrid(height, width);
    this.setVal = this.setVal.bind(this);
    this.addWall = this.addWall.bind(this);
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
    grid[this.startPos[0]][this.startPos[1]].className = 'start';
    grid[this.endPos[0]][this.endPos[1]].className = 'end';
    return grid;
  }

  setVal(pos, val) {
    this.grid[pos[0]][pos[1]].className = val;
  }

  addWall(pos) {
    let tile = this.grid[pos[0]][pos[1]];
    // check if tile is empty before adding wall
    if (tile === 'empty') this.setVal(tile, 'wall');
  }
}

export default Maze;
