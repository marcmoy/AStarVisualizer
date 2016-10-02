import React from 'react';
import $ from 'jquery';
require('jquery-ui-bundle');

class Instructions extends React.Component {
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
          <h1>Instructions
            <span id='hide-instructions'>hide</span>
          </h1>
        </header>
        <p>
          Click within the white grid and drag mouse to create obstacles.<br/>
          Drag the <span className='green'>green</span> node to set
          a start position.<br/>
          Drag the <span className='red'>red</span> node a set
          an end position.<br/>
          Use the right hand-panel to clear obstacles, path, and solve.
        </p>
      </div>
    );
  }
}

export default Instructions;
