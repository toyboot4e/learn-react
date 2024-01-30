import { useState } from 'react'
import './App.css'

// TODO: force strict types via `tsconfig`

type Props = {
  value: string,
  onSquareClick?: React.MouseEventHandler<HTMLButtonElement>,
}

function Square({ value, onSquareClick }: Props) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

export default function Board() {
  // TODO: `useState` looks like assining a field (..but where? To the global context?)
  // TODO: use boolean for the underlying value type
  const [squares, setSquares] = useState(Array(9).fill(null));

  // TODO: `function` vs lambda
  // TODO: something like reduce would be better?
  // TODO: let TypeScript infer their type?
  const handleClick = () => {
    // TODO: it's deep clone, right?
    const nexts = squares.slice(); // clone
    nexts[0] = "X";
    setSquares(nexts);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        <Square value={squares[1]} onSquareClick={handleClick} />
        <Square value={squares[2]} onSquareClick={handleClick} />
      </div >
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={handleClick} />
        <Square value={squares[4]} onSquareClick={handleClick} />
        <Square value={squares[5]} onSquareClick={handleClick} />
      </div >
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={handleClick} />
        <Square value={squares[7]} onSquareClick={handleClick} />
        <Square value={squares[8]} onSquareClick={handleClick} />
      </div >
    </>
  );
}

