var count = 0;

class Tile {
  constructor(pos, className = 'empty') {
    this.id = count; count += 1;
    this.gCost = 0;
    this.hCost = 0;
    this.open = false;
    this.pos = pos;
    this.className = className;
  }

  addClass(name) {
    this.className += ` ${name}`;
  }

  removeClass(name) {
    let names = this.className.split(' ');
    let idx = names.indexOf(name);
    this.className = names.splice(idx, 0).join(' ');
  }

  explore(parent, endPos) {
    if (!this.open) {
      this.gCost = dist(parent.pos, this.pos) + parent.gCost;
      this.hCost = dist(endPos, this.pos);
      this.parent = parent;
      this.open = true;
      this.addClass('open');
    } else {
      let gCost = dist(parent.pos, this.pos) + parent.gCost;
      if (gCost < this.gCost) {
        this.gCost = gCost;
        this.parent = parent;
      }
    }
  }

  fCost() {
    return this.gCost + this.hCost;
  }
}

const dist = (pos1, pos2) => {
  let x1 = pos1[0];
  let x2 = pos2[0];
  let y1 = pos1[1];
  let y2 = pos2[1];
  let xDiff = Math.abs(x1 - x2);
  let yDiff = Math.abs(y1 - y2);
  let maxDiff = Math.min(xDiff, yDiff);
  let minDiff = Math.abs(xDiff - yDiff);
  return maxDiff * 14 + minDiff * 10;
};

export default Tile;
