class Solver {
  constructor(maze) {
    this.maze = maze;
    this.grid = this.maze.grid;
    this.solved = false;
    this.closedList = [maze.startTile];
    this.openList = [];
  }

  solveMaze(result) {
    if (this.interval) clearInterval(this.inverval);
    this.interval = window.setInterval(() => {
      this.step(result);
    }, 200);
  }

  step(result) {
    console.log('step');
    const DELTAS = [[-1,-1],[-1,0],[-1,-1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let parentTile = this.closedList[this.closedList.length - 1];
    let parentPos = parentTile.pos;
    for (let i = 0; i < DELTAS.length; i++) {
      let delta = DELTAS[i];
      let tile = this.grid[parentPos[0] + delta[0]][parentPos[1] + delta[1]];
      if (tile) {
        if (tile.className === 'empty') {
          tile.explore(parentTile, this.maze.endPos);
          this.openList.push(tile);
        } else if (tile.className === 'end') {
          this.solved = true;
          this.openList.push(tile);
          clearInterval(this.interval);
          this.tracePath(tile);
          return;
        }
      }
    }
    this.openNextNode(result);
  }

  openNextNode(result) {
    let idx = 0;
    let minNode = this.openList[0];
    let minFCost = minNode.fCost();
    for (let i = 1; i < this.openList.length; i++) {
      let node = this.openList[i];
      if (node.fCost() < minFCost) {
        minNode = node;
        minFCost = node.fCost();
        idx = i;
      }
    }
    minNode.removeClass('open');
    minNode.addClass('closed');
    this.closedList.push(minNode);
    this.openList.splice(idx, 1);
    result(this);
  }

  tracePath(tile) {
    if (tile.parent) {
      if (tile.parent.className === 'start');
      if (tile.className !== 'end') tile.addClass('path');
      this.tracePath(tile.parent);
    }
  }
}

export default Solver;
