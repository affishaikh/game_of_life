import React, { Component } from 'react';
import './main.css';

const Data = function(props) {
  const { element, rowIndex, columnIndex } = props;
  return <td className={"color-"+element} id={rowIndex + ',' + columnIndex}></td>;
};

const Row = function(props) {
  const { row, rowIndex } = props;
  return (
    <tr>
      {row.map((element, index) => (
        <Data element={element} rowIndex={rowIndex} columnIndex={index} />
      ))}
    </tr>
  );
};

const Body = function(props) {
  const { grid } = props;
  return (
    <tbody>
      {grid.map((row, index) => (
        <Row row={row} rowIndex={index} />
      ))}
    </tbody>
  );
};

class Table extends Component {
  render() {
    return (
      <table className="grid" id="grid" onClick={this.props.onClick}>
        <Body grid={this.props.grid} />
      </table>
    );
  }
}

export default Table;
