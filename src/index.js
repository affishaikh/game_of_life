import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid.js';
import { nextGeneration } from './models/gameOfLife';

const emptyGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      grid: getCopyOf(emptyGrid),
      aliveCells: [[4, 4], [4, 5], [5, 5]],
      bounds: {
        topLeft: [0, 0],
        bottomRight: [9, 9]
      }
    };
  }

  updateState(aliveCells) {
    this.setState(() => {
      const grid = getCopyOf(emptyGrid);

      aliveCells.forEach(cell => {
        grid[cell[0]][cell[1]] = 1;
      });

      return { grid, aliveCells };
    });
  }

  evolve() {
    const { aliveCells, bounds } = this.state;
    const nextGenerationAliveCells = nextGeneration(
      getCopyOf(aliveCells),
      bounds
    );
    this.updateState(getCopyOf(nextGenerationAliveCells));
  }

  componentDidMount() {
    setInterval(this.evolve.bind(this), 1000);
  }

  addAliveCell(event) {
    const targetId = event.target.id;
    const targetIdArr = targetId.split(',');
    const cell = [+targetIdArr[0], +targetIdArr[1]];
    const { aliveCells } = this.state;
    const newAliveCells = getCopyOf(aliveCells);
    newAliveCells.push(cell);
    console.log(newAliveCells);
    this.setState({ aliveCells: getCopyOf(newAliveCells) });
  }

  render() {
    return (
      <Grid grid={this.state.grid} onClick={this.addAliveCell.bind(this)} />
    );
  }
}

ReactDOM.render(<World />, document.getElementById('root'));
