import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid.js';
import { nextGeneration } from './models/gameOfLife';

const emptyGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const getCopyOf = grid => grid.map(row => row.slice());

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: getCopyOf(emptyGrid)
    };
  }

  play() {
    const aliveCells = nextGeneration([[4, 4], [4, 5], [5, 5]], {
      topLeft: [0, 0],
      bottomRight: [9, 9]
    });

    console.log(aliveCells);

    this.setState(() => {
      const grid = getCopyOf(emptyGrid);
      aliveCells.forEach(cell => {
        grid[cell[0]][cell[1]] = 1;
      });
      return { grid };
    });
  }

  componentDidMount() {
    setInterval(this.play.bind(this), 1000);
  }

  render() {
    return <Grid grid={this.state.grid} />;
  }
}

ReactDOM.render(<World />, document.getElementById('root'));
