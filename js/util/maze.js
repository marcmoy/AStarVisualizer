import Tile from './tile';

class Maze {
  constructor(height = 30, width = 50) {
    this.startPos = [Math.floor(height / 2), Math.floor(width * (1 / 4))];
    this.endPos = [Math.floor(height / 2), Math.floor(width * (3 / 4))];
    this.initializeGrid = this.initializeGrid.bind(this);
    this.grid = this.initializeGrid(height, width);
    this.setVal = this.setVal.bind(this);
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

    let startTile = grid[this.startPos[0]][this.startPos[1]];
    startTile.className = 'start';
    startTile.open = false;
    startTile.closed = true;

    let endTile = grid[this.endPos[0]][this.endPos[1]];
    endTile.className = 'end';
    endTile.open = false;
    endTile.closed = true;

    return grid;
  }

  setVal(pos, val) {
    this.grid[pos[0]][pos[1]].className = val;
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

  tile(pos) {
    return this.grid[pos[0],pos[1]];
  }

  solve() {
    this.closed = [this.tile(this.startPos)];
    this.open = [];
    while (!this.gameover) {
      this.step();
    }
  }

  step(secs = 0) {
    let currentTile = this.closed[this.closed.length - 1];
    this.openTiles(currentTile, finished => {
      if (finished) this.tracePath();
    });
  }

  tracePath() {

  }
}

export default Maze;
