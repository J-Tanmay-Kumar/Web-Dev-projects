import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1>Hello, World!</h1>
      <p>This is a simple counter with history.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Click Me
      </button>
    </div>
  )
}

export default App
