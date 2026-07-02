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
      <form >
        <input type="text" placeholder='Enter Title' className="border-2 border-gray-400 p-2 rounded w-min" value={title} onChange={(e) => {
          setTitle(e.target.value)
        }} />
        <input type="text" placeholder='Enter Notes' className="border-2 border-gray-400 p-2 rounded w-2xs" value={note} onChange={(e)=>{
          setNote(e.target.value)
        }}/>
        <button onClick={add} className="bg-red-800 h-10 w-20 rounded-full m-5 text-white">Add</button>
      </form>
    </div>
  )
}

export default App
