import React from 'react';
import $ from 'jquery';
require('jquery-ui-bundle');

class Introduction extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let $instructions = $('#instructions');
    $instructions.draggable();
    $instructions.css({'position': 'fixed'});
    $('#hide-instructions').click(() => $instructions.hide());
  }

  render() {
    return (
      <div id='instructions' className='draggable'>
        <header>
          <h1>A* Algorithm Visualizer
            <span id='hide-instructions'>hide</span>
          </h1>
        </header>
        <p>
          <span style={{textDecoration: 'underline'}}>Instructions:</span><br/>
          Click within the white grid and drag mouse to create obstacles.<br/>
          Drag the <span className='green'>green</span> node to set
          a start position.<br/>
          Drag the <span className='red'>red</span> node to a set
          an end position.<br/>
          Use the right hand-panel to clear obstacles, path, and solve.
        </p>
      </div>
    );
  }
}

export default Introduction;
