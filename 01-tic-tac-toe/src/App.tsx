import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function Square() {
  return (
    <>
      y-x
      <div className="board-row">
        <button className="square">1-1</button>
        <button className="square">1-2</button>
        <button className="square">1-3</button>
      </div>
      <div className="board-row">
        <button className="square">2-1</button>
        <button className="square">2-2</button>
        <button className="square">2-3</button>
      </div>
      <div className="board-row">
        <button className="square">3-1</button>
        <button className="square">3-2</button>
        <button className="square">3-3</button>
      </div>
    </>
  );
}

