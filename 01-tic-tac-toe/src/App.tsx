import { useState } from 'react'
import './App.css'

// TODO: force strict types via `tsconfig`
// TODO: use `===`?
// TODO: assert and panic (throw?)

type SquareProps = {
  value: string,
  onSquareClick: (i: number) => void,
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

// TODO: use map, all, etc.
function calcWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

type BoardProps = {
  turnOfX: Boolean,
  squares: string[],
  onPlay: () => void,
};

function Board({ turnOfX, squares, onPlay }: BoardProps) {
  // TODO: something like reduce would be better?
  // TODO: let TypeScript infer their type?
  // TODO: why can I ignore the first argument? (overloaded?)
  const handleClick = (i: number) => {
    // TODO: prefer explicit comparison to `null` or not?
    // TODO: null, undefined, ===, !==
    if (squares[i] || calcWinner(squares)) {
      return;
    }

    // TODO: it's deep clone, right?
    const nexts = squares.slice(); // clone

    if (turnOfX) {
      nexts[i] = "X";
    } else {
      nexts[i] = "O";
    }

    onPlay(nexts);
  }

  // TODO; consider separating it to a functon
  const winner = calcWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (turnOfX ? "X" : "O");
  }

  // TODO: use map
  return (
    <>
      <div className="status">{status}<div />
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div >
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div >
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div >
      </div >
    </>
  );
}

export default function Game() {
  // TODO: `useState` looks like assining a field (..but where? To the global context?)
  // TODO: use boolean for the underlying value type
  // TODO: use enumeartion type
  const [turnOfX, setTurnOfX] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const squares = history[history.length - 1];

  const handlePlay = (nextSquares) => {
    setHistory([...history, nextSquares]);
    setTurnOfX(!turnOfX);
  }

  const jumpTo = (nextMove) => {
    // TODO
  }

  // Go to game start
  // Go to move #1
  // Go to move #2 ..
  const historyDisplay = history.map((squares, move) => {
    let description;
    if (move == 0) {
      description = "Go to game start";
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      throw new Error("invalid move?");
    }

    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board turnOfX={turnOfX} squares={squares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{historyDisplay}</ol>
      </div>
    </div>
  );
}
