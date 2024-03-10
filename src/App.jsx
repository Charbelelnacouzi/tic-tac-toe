import React, { useState } from 'react';
import './App.css';

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((value, index) => (
      <Square key={index} value={value} onClick={() => onClick(index)} />
    ))}
  </div>
);
const App = () => {
  const [state, setState] = useState(initialState);

  const handleClick = (index) => {
    const squares = state.squares.slice();

    if (squares[index] || state.winner) {
      return;
    }

    squares[index] = state.xIsNext ? 'X' : 'O';

    const winner = calculateWinner(squares);

    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
      winner: winner,
    });
  };

  const handleReset = () => {
    setState(initialState);
  };

  const status = state.winner
    ? `Winner: ${state.winner}`
    : state.squares.every((square) => square !== null)
    ? 'It\'s a draw!'
    : `Next player: ${state.xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={state.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        {state.winner || state.squares.every((square) => square !== null) ? (
          <button className="reset-button" onClick={handleReset}>
            Reset Game
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default App;