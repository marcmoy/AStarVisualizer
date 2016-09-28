var count = 0;

class Tile {
  constructor(pos, startPos, endPos, className = 'empty') {
    this.id = count; count += 1;
    this.pos = pos;
    this.className = className;
    this.hCost = 0;
    this.gCost = 0;
    this.open = true;
    this.closed = false;
    this.fCost = this.fCost.bind(this);
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  fCost() {
    return this.hCost + this.gCost;
  }

  addClass(name) {
    this.className += ` ${name}`;
  }

  removeClass(name) {
    let names = this.className.split(' ');
    let idx = names.indexOf(name);
    this.className = names.splice(idx, 0).join(' ');
  }
}

export default Tile;
