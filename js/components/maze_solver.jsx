import React from 'react';
import Maze from '../util/maze';

class MazeSolver extends React.Component {
  constructor() {
    super();
    this.state = { maze: new Maze };
    this.renderGrid = this.renderGrid.bind(this);
  }

  renderGrid() {
    let grid = this.state.maze.grid.map( (row,i) => {

      let tiles = row.map( (tile,j) => {
        let pos = tile.pos;
        debugger;
        return <td className={tile.className} value={pos} key={pos}></td>;
      });

      return <tr key={i}>{tiles}</tr>;
    });

    return (
      <table className='grid'>
        <tbody>
          {grid}
        </tbody>
      </table>
    );
  }

  render() {
    return(
      <div>
        {this.renderGrid()}
      </div>
    );
  }
}

export default MazeSolver;
