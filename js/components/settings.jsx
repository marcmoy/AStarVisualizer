import React from 'react';
import $ from 'jquery';
require('jquery-ui-bundle');

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let $settings = $('div.settings');
    $settings.draggable();
    $settings.css({'position': 'fixed'});
  }

  render() {
    return(
      <div className='settings draggable'>
        <ul>
          <li>
            <button
              onClick={this.props.resetMaze}
              disabled={this.props.solving}>
              Reset maze
            </button>
          </li>
          <li>
            <button
              onClick={this.props.randomWalls}
              disabled={this.props.solving}>
              Create maze
            </button>
          </li>
          <li>
            <button
              onClick={this.props.solve}
              disabled={this.props.solving || this.props.solved}>
              {this.props.solving ? 'Solving...' : 'Solve'}
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Settings;
