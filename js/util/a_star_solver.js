import _ from 'lodash';

const aStarSolver = (grid, start, end, recordStep) => {
  let startNode = grid[start[0]][start[1]];

  let initialDist = dist(start, end);        // distance from start to end
  startNode.g = 0;                           // g = movement cost
  startNode.h = initialDist;                 // h = hueristic cost (dist to end)
  startNode.f = initialDist;                 // f = g + h

  let openList = [startNode];                // start open list with start node
  let currentNode;                           // declare currentNode scope

  whileLoop:
  while (openList.length !== 0) {             // loop until open list is empty
    currentNode = lowestF(openList);                   // find lowest f node
    openList.splice(openList.indexOf(currentNode),1);  // remove from open list
    if (currentNode.className === 'end') break;        // break if end found

    let successors = adjNodes(currentNode, grid);      // look at neighbor nodes

    forLoop:
    for (let i = 0; i < successors.length; i++) {
      let node = successors[i];
      recordStep(Object.assign({}, node));                        // record step

      // calculate movement value from currentNode at this instance
      let g = currentNode.g + dist(currentNode.pos, node.pos);

      switch (node.className) {
        case 'end':
          node.h = 0;
          openList.push(node);
          break;
        case 'empty':                     // if empty, node has not been visited
          node.h = dist(node.pos, end);   // assign h cost
          node.className = 'open';
          openList.push(node);            // add to node to open list
          break;
        case 'open':                      // if open, node has been visited
          if (node.g < g) {               // if old movement < new movement
            continue forLoop;             // continue to next successor node
          }
          break;
        case 'closed':                    // if closed, still need to check
          if (node.g < g) {               // if old movement < new movement
            continue forLoop;             // continue to next successor node
          } else {                        // otherwise,
            node.className = 'open';      // change to back to open
            openList.push(node);          // and add back to open list
          }
          break;
      }

      node.g = g;                         // set new movement cost
      node.f = node.g + node.h;           // calculate new f cost
      node.parent = currentNode;          // assign parent node
    }

    if (currentNode.className === 'start') continue;        // ignore startNode
    currentNode.className = 'closed';                       // close currentNode
  }

  let endNode = grid[end[0]][end[1]];                       // find end node
  recordStep(Object.assign({}, endNode));                   // record step
  return tracePath(endNode, grid, recordStep);              // start recursion
};

// use recursion to trace the path from end node to start node
const tracePath = (node, grid, recordStep) => {
  if (node.className === 'start') return grid;

  if (node.className !== 'end') {
    let pos = node.pos;
    grid[pos[0]][pos[1]].className = 'path';
  }

  recordStep(Object.assign({}, node));  // record step

  return tracePath(node.parent, grid, recordStep);
};

const dist = (pos1, pos2) => {
  let x1 = pos1[0];
  let x2 = pos2[0];
  let y1 = pos1[1];
  let y2 = pos2[1];
  let xDiff = Math.abs(x1 - x2);
  let yDiff = Math.abs(y1 - y2);
  let maxDiff = Math.min(xDiff, yDiff);
  let minDiff = Math.abs(xDiff - yDiff);
  return maxDiff * 14 + minDiff * 10;   // allows for diagonals movements
  // return (xDiff + yDiff) * 10;       // allows only up and down movements
};

const lowestF = (openList) => {
  let minF = openList[0].f;
  let minIdx = 0;
  for (let i = 1; i < openList.length; i++) {
    let node = openList[i];
    if ( node.f < minF ) {
      minF = node.f;
      minIdx = i;
    }
  }
  return openList[minIdx];
};

const DELTAS = [
  [-1,-1], [-1, 0], [-1, 1],
  [ 0,-1], /*node*/ [ 0, 1],
  [ 1,-1], [ 1, 0], [ 1, 1]
];

// DELTAS for up and down movements only

// const DELTAS = [
//             [-1, 0],
//   [ 0,-1],  /*node*/  [ 0, 1],
//             [ 1, 0]
// ];

const adjNodes = (currentNode, grid) => {
  let height = grid.length;
  let width = grid[0].length;

  let currentPos = currentNode.pos;
  let nodes = [];

  for (let i = 0; i < DELTAS.length; i++) {
    let delta = DELTAS[i];
    let x = currentPos[0] + delta[0];
    let y = currentPos[1] + delta[1];

    // don't check if x or y is out of range
    // prevent undefined error
    if ( _.inRange(x, height) && _.inRange(y, width) ) {
      let node = grid[x][y];
      let name = node.className;
      // don't consider start node or a walls
      if (name !== 'start' && name !== 'wall') {
        nodes.push(grid[x][y]);
      }
    }
  }

  return nodes;
};

export default aStarSolver;
