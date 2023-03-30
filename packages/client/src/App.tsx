import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://n-point.net" target="_blank">
          <img src="https://n-point.net/wp-content/uploads/2022/04/dce515a68cbadc014b1115f85632ae05.png" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>🍇 N-Point Muscadine</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
