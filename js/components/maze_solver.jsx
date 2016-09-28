import React from 'react';
import Settings from './settings';
import Maze from '../util/maze';

class MazeSolver extends React.Component {
  constructor() {
    super();
    this.state = { maze: new Maze, startPicker: false, endPicker: false };
    this.renderGrid = this.renderGrid.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.toggleStartPicker = this.toggleStartPicker.bind(this);
    this.toggleEndPicker = this.toggleEndPicker.bind(this);
  }

  renderGrid() {
    let grid = this.state.maze.grid.map( (row,i) => {

      let tiles = row.map( (tile,j) => {
        let pos = tile.pos;
        return (
          <td
            className={tile.className}
            value={pos}
            key={pos}
            onMouseDown={this.handleClick}
            onMouseOver={this.handleMouseOver}/>
        );
      });

      return <tr key={i}>{tiles}</tr>;
    });

    return (
      <table>
        <tbody>
          {grid}
        </tbody>
      </table>
    );
  }

  toggleStartPicker() {
    if (this.state.startPicker) {
      this.setState({ startPicker: false });
    } else {
      this.setState({ startPicker: true, endPicker: false });
    }
  }

  toggleEndPicker() {
    if (this.state.endPicker) {
      this.setState({ endPicker: false });
    } else {
      this.setState({ endPicker: true, startPicker: false });
    }
  }

  handleClick(e) {
    let maze = this.state.maze;
    let pos = e.target.attributes.value.value.split(',').map(i => parseInt(i));

    if (this.state.startPicker) {
      maze.setStart(pos);
    } else if (this.stateEndPicker) {
      maze.setEnd(pos);
    } else {
      maze.toggleWall(pos);
    }

    this.setState({ maze: maze });
  }

  handleMouseOver(e) {
    let maze = this.state.maze;
    let pos = e.target.attributes.value.value.split(',').map(i => parseInt(i));
    if (this.state.startPicker || this.state.endPicker) return;
    if (e.buttons) maze.toggleWall(pos);
    this.setState({ maze: maze });
  }

  render() {
    return(
      <div className='container'>
        <h1 className='title'>Maze Solver Visualizer</h1>
        <h2 className='author'>by Marc Moy</h2>
        <div className='grid'>{this.renderGrid()}</div>
        <Settings
          toggleStartPicker={this.toggleStartPicker}
          toggleEndPicker={this.toggleEndPicker}
          startOn={this.state.startPicker}
          endOn={this.state.endPicker}
        />
        <div className='slider'>slider area</div>
      </div>
    );
  }
}

export default MazeSolver;
