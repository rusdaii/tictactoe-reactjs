import * as React from 'react';
import useSquares from './store/zustand';

function Board() {
  const { squares, setSquares } = useSquares((state) => state);

  function selectSquare(square) {
    const nextValue = calculateNextValue(squares);
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[square] = nextValue;
    setSquares(nextSquares);
  }

  // function restart() {}

  function renderSquare(i) {
    return (
      <button
        className="border border-gray-700 w-16 h-16 flex items-center justify-center text-2xl font-semibold"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="mb-4">
        {calculateStatus(
          calculateWinner(squares),
          squares,
          calculateNextValue(squares)
        )}
      </div>
      <div className="grid grid-cols-3 gap-0">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid grid-cols-3 gap-0">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid grid-cols-3 gap-0">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const { restart } = useSquares((state) => state);
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Board />
      </div>
      <button
        className=" rounded-full text-white bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-5 py-2"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  // console.log(squares, '<<<<<<<<<<');
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
}

function App() {
  return <Game />;
}

export default App;
