import { useState } from 'react'
import './App.css'

// TODO: separate "go to game start" from step history
// TODO: force strict types via `tsconfig`
// TODO: null, undefined, ===, !==
// TODO: truthy values
// TODO: assert and panic (throw?)
// TODO: typedoc

type SquareProps = {
  value: string,
  isFocused: boolean,
  onSquareClick: () => void,
}

function Square({ value, isFocused, onSquareClick }: SquareProps) {
  // TODO: use ternary operator and optional className instead
  if (isFocused) {
    return (
      <button className="square" style={{ color: "red" }} onClick={onSquareClick}>
        {value}
      </button>
    );
  } else {
    return (
      <button className="square" onClick={onSquareClick}>{value}</button>
    );
  }
}

// TODO: use map, all, etc.
function findWin(squares: string[]): number[] | null {
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
      return [a, b, c];
    }
  }

  return null;
}

type BoardProps = {
  // Primitive `boolean`, not an object `Boolean`
  turnOfX: boolean,
  squares: string[],
  onPlay: (i: number, nextSquares: string[]) => void,
};

function Board({ turnOfX, squares, onPlay }: BoardProps) {
  // TODO: something like reduce would be better?
  // TODO: let TypeScript infer their type?
  // TODO: why can I ignore the first argument? (overloaded?)
  const handleClick = (i: number) => {
    // TODO: prefer explicit comparison to `null` or not?
    if (squares[i] || findWin(squares) !== null) {
      return;
    }

    // TODO: it's deep clone, right?
    const nexts = squares.slice(); // clone

    if (turnOfX) {
      nexts[i] = "X";
    } else {
      nexts[i] = "O";
    }

    onPlay(i, nexts);
  }

  // TODO; consider separating it to a functon
  const winningLine = findWin(squares);
  let status;
  if (winningLine) {
    const winner = (!turnOfX ? "X" : "O");
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (turnOfX ? "X" : "O");
  }

  // TODO: opnionated formatter?
  return (
    <>
      <div className="status">{status}</div>
      {
        [0, 1, 2].map((row) =>
          <div key={row} className="board-row">
            {
              [0, 1, 2].map((col) => {
                var i = row * 3 + col;
                var isFocused = winningLine?.includes(i) ?? false;
                return (<Square key={i} value={squares[i]} isFocused={isFocused} onSquareClick={() => handleClick(i)} />);
              })
            }
          </div>)
      }
    </>
  );
}

// TODO: what is the return type. tsc should make it a compile error.
export default function Game() {
  // TODO: `useState` looks like assining a field (..but where? To the global context?)
  // TODO: https://react.dev/reference/react/memo

  const [boardHistory, setBoardHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [stepHistory, setStepHistory] = useState<[number, number][]>([]);
  const [nSteps, setNSteps] = useState(0);
  const [doRevOrder, setDoRevOrder] = useState(false);

  // TODO: use `enum` for the underlying value type
  const squares = boardHistory[nSteps];

  const handlePlay = (i: number, nextSquares: string[]) => {
    const nextHistory = [...boardHistory.slice(0, nSteps + 1), nextSquares];
    setBoardHistory(nextHistory);
    setNSteps(nextHistory.length - 1);
    setStepHistory([...stepHistory.slice(0, nSteps + 1), [Math.floor(i / 3), i % 3]]);
  }

  const jumpTo = (nextStep: number) => {
    setNSteps(nextStep)
  }

  // Go to game start
  // Go to move #1
  // Go to move #2 ..
  const historyDisplay = boardHistory.map((_squares, iItem) => {
    // reverse index if necesary
    const iMove = doRevOrder ? (boardHistory.length - 1 - iItem) : iItem;

    // TODO: let me zip anyways..
    const [y, x] = iMove > 0 ? stepHistory[iMove - 1] : [-1, -1];
    let posHistory = `(${y}, ${x})`;

    // TODO: no better way to write this rather than to using a local function?
    let desc;
    if (iMove == 0) {
      desc = "Go to game start";
    } else if (iMove == nSteps) {
      desc = `You are at move ${iMove} ${posHistory}`;
    } else if (iMove > 0) {
      desc = `Go to move # ${iMove} ${posHistory}`;
    } else {
      throw new Error("invalid move?");
    }

    return (
      <li key={iItem} value={iMove}>
        <button onClick={() => jumpTo(iMove)}>{desc}</button>
      </li>
    );
  });

  const handleReverseOrder = () => {
    setDoRevOrder(!doRevOrder);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board turnOfX={nSteps % 2 === 0} squares={squares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* In HTML, numerical values are treated as strings. In React, we can write numbers,
            but inside `{}`. */}
        <ol>
          <button className="status" onClick={handleReverseOrder}>Reverse order</button>
          {historyDisplay}
        </ol>
      </div>
    </div>
  );
}
