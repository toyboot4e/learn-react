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
    // FIXME: "not assignable" after all? (or my linter is wrong)
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
  turnOfX: boolean,
  squares: string[],
  onPlay: (nextSquares: string[]) => void,
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
  // TODO: https://react.dev/reference/react/memo

  // TODO: use enumeartion type
  const [turnOfX, setTurnOfX] = useState(true);
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);

  // TODO: use boolean for the underlying value type
  const squares = history[currentStep];

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, currentStep + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
    setTurnOfX(!turnOfX);
  }

  const jumpTo = (nextStep: number) => {
    setCurrentStep(nextStep)
    setTurnOfX(nextStep % 2 === 0);
  }

  // Go to game start
  // Go to move #1
  // Go to move #2 ..
  const historyDisplay = history.map((squares, iMove) => {
    let description;
    if (iMove == 0) {
      description = "Go to game start";
    } else if (iMove > 0) {
      description = "Go to move #" + iMove;
    } else {
      throw new Error("invalid move?");
    }

    return (
      // Each `li` needs to be assigned a unique `key` so that React can track the change.
      // Note that the `key` is removed on rendering. Even a database ID would not matter.
      <li key={iMove}>
        <button onClick={() => jumpTo(iMove)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board turnOfX={turnOfX} squares={squares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol start="0">{historyDisplay}</ol>
      </div>
    </div>
  );
}
