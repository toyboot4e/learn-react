import { useState } from 'react'
import './App.css'

// TODO: force strict types via `tsconfig`

function Square() {
  // TODO: `useState` looks like assining a field (..but where? To the global context?)
  // TODO: use boolean for the underlying value type
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button className="square" onClick={handleClick}>{value}</button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div >
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div >
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div >
    </>
  );
}

