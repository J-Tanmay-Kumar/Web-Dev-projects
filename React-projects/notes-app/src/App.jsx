import React from 'react'
import { useState } from 'react'

const App = () => {
  let [title, setTitle] = useState('')
  let [note, setNote] = useState('')

  const add = (e) => {
    e.preventDefault()
    console.log(title)
    console.log(note)
    setTitle('')
    setNote('')
  }

  return (
    <div className='flex justify-center items-center h-lvh'>
  {/* Wrapped both the form and button in a flex container with items-end */}
  <div className="flex items-end gap-3 bg-blue-400 h-vh w-vh p-10 rounded-full">
    <form className='flex flex-col text-white'>
      {/* Top Input: Only rounds top corners, removes bottom border to prevent the thick line */}
      <input 
        type="text" 
        placeholder='Enter Title' 
        className="border-2 border-b-0 border-gray-400 p-2 rounded-t-lg w-2xs outline-none" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      {/* Bottom Input: Only rounds bottom corners */}
      <input 
        type="text" 
        placeholder='Enter Notes' 
        className="border-2 border-gray-400 p-2 rounded-b-lg w-2xs outline-none" 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
      />
    </form>
    
    {/* Button: Aligns perfectly with the bottom input line */}
    <button 
      onClick={add} 
      className="bg-red-800 h-10 px-5 rounded-lg text-white font-medium hover:bg-red-900 transition-colors"
    >
      Add
    </button>
  </div>
</div>
  )
}

export default App
