import { useState } from 'react'
import './App.css'
import expand from 'emmet';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Emmet 速習</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p style={{ whiteSpace: "pre_line" }}>
          {expand('div>ol>li+li+li')}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
