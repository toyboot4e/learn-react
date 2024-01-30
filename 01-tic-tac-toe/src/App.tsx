import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Square({ value }: { value: string }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  // TODO: flatten??
  return (
    <>
      y-x
      <div className="board-row">
        <Square value="1-1"></Square>
        <Square value="1-2"></Square>
        <Square value="1-3"></Square>
      </div >
      <div className="board-row">
        <Square value="2-1"></Square>
        <Square value="2-2"></Square>
        <Square value="2-3"></Square>
      </div >
      <div className="board-row">
        <Square value="3-1"></Square>
        <Square value="3-2"></Square>
        <Square value="3-3"></Square>
      </div >
    </>
  );
}

