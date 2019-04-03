import React, { Component } from 'react';

const Data = function(props) {
  const { element } = props;
  return <td>{element}</td>;
};

const Row = function(props) {
  const { row } = props;
  return (
    <tr>
      {row.map(element => (
        <Data element={element} />
      ))}
    </tr>
  );
};

const Body = function(props) {
  const { grid } = props;
  return (
    <tbody>
      {grid.map(row => (
        <Row row={row} />
      ))}
    </tbody>
  );
};

class Table extends Component {
  render() {
    return (
      <table className="grid" id="grid">
        <Body grid={this.props.grid} />
      </table>
    );
  }
}

export default Table;
