import _ from 'lodash';

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
    }, 1);
  }

  step(result) {
    console.log('step');
    const DELTAS = [[-1,-1],[-1,0],[-1,-1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    let parentTile = this.closedList[this.closedList.length - 1];
    let parentPos = parentTile.pos;
    for (let i = 0; i < DELTAS.length; i++) {
      let delta = DELTAS[i];
      let tile;
      let row = this.grid[parentPos[0] + delta[0]];
      if (row) tile = row[parentPos[1] + delta[1]];

      if (tile) {
        if (tile.className === 'empty' || tile.className === 'open') {
          if (tile.className === 'empty') this.openList.push(tile);
          tile.explore(parentTile, this.maze.endPos);
        } else if (tile.className === 'end') {
          this.solved = true;
          this.openList.push(tile);
          tile.parent = parentTile;
          clearInterval(this.interval);
          return this.tracePath(tile, result);
        }
      }
    }
    this.openNextNode(result);
  }

  openNextNode(result) {
    let minFCost = this.openList[0].fCost();
    for (let i = 1; i < this.openList.length; i++) {
      let node = this.openList[i];
      if (node.fCost() < minFCost) minFCost = node.fCost();
    }

    let minNodes = this.openList.filter(node => {
      return node.fCost() === minFCost;
    });

    let minHCost = minNodes[0].hCost;

    for (let i = 1; i < minNodes.length; i++) {
      let node = minNodes[i];
      if (node.hCost < minHCost) minHCost = node.hCost;
    }

    let selectNodes = minNodes.filter(node => {
      return node.hCost === minHCost;
    });

    let minNode = selectNodes[0];
    let idx = this.openList.indexOf(minNode);
    minNode.removeClass('open');
    minNode.addClass('closed');
    this.closedList.push(minNode);
    this.openList.splice(idx, 1);
    result(this);
  }

  tracePath(tile, result) {
    if (tile.className === 'start') return result(this);
    if (tile.className !== 'end') tile.className = 'path';
    this.tracePath(tile.parent, result);
  }
}

export default Solver;
