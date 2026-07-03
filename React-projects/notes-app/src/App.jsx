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
  <div className='flex justify-center items-center h-screen bg-slate-100'>
  {/* Wrapped both the form and button in a flex container with items-end */}
  <div className="flex items-end gap-4 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
    <form className='flex flex-col text-slate-800'>
      {/* Top Input: Only rounds top corners, removes bottom border to prevent the thick line */}
      <input 
        type="text" 
        placeholder='Enter Title' 
        className="border border-b-0 border-slate-300 p-3 rounded-t-xl w-64 outline-none font-semibold placeholder-slate-400 focus:border-blue-500 focus:bg-slate-50 transition-colors" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      {/* Bottom Input: Only rounds bottom corners */}
      <input 
        type="text" 
        placeholder='Enter Notes' 
        className="border border-slate-300 p-3 rounded-b-xl w-64 outline-none text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-slate-50 transition-colors" 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
      />
    </form>
    
    {/* Button: Aligns perfectly with the bottom input line */}
    <button 
      onClick={add} 
      className="bg-blue-600 h-11 px-5 rounded-xl text-white font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20"
    >
      Add
    </button>
  </div>
</div>
  )
}

export default App
