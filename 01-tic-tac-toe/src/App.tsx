import { useState } from 'react'
import './App.css'

function Square() {
  // `useState` looks like assining a field (..but where? To the global context?)
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

