import { useState } from 'react'
import './App.css'

// TODO: force strict types via `tsconfig`

type Props = {
  value: string,
  onSquareClick: (i: number) => void,
}

function Square({ value, onSquareClick }: Props) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

export default function Board() {
  // TODO: use enumeartion type
  const [turnOfX, setTurnOfX] = useState(true);

  // TODO: `useState` looks like assining a field (..but where? To the global context?)
  // TODO: use boolean for the underlying value type
  const [squares, setSquares] = useState(Array(9).fill(null));

  // TODO: `function` vs arrow
  // TODO: something like reduce would be better?
  // TODO: let TypeScript infer their type?
  // TODO: why can I ignore the first argument? (overloaded?)
  const handleClick = (i: number) => {
    // TODO: it's deep clone, right?
    const nexts = squares.slice(); // clone

    if (turnOfX) {
      nexts[i] = "X";
    } else {
      nexts[i] = "O";
    }

    setSquares(nexts);
    setTurnOfX(!turnOfX);
  }

  // TODO: use map
  return (
    <>
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
    </>
  );
}

