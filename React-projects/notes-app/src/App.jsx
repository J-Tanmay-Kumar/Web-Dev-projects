import React from 'react'
import { useState } from 'react'

const App = () => {
  let [title, setTitle] = useState('')
  let [note, setNote] = useState('')
  let [task, setTask] = useState([])
  
  const submitHandler = (e) => {
    e.preventDefault()
    let details = [...task]
    details.push({ title, note })
    setTask(details)
    console.log(details)

    setTitle('')
    setNote('')
  }


  const DeleteBtn = (idx)=>{
    let details = [...task]
    details.splice(idx,1)
    setTask(details)
  }
  return (

    <div className='flex justify-center items-center h-screen bg-slate-100 flex-col flex-wrap gap-10'>
      <h1 className='font-bold text-3xl'>Add Notes</h1>
      {/* Wrapped both the form and button in a flex container with items-end */}
      <div className="flex items-end gap-4 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <form className='flex flex-col text-slate-800 ' >
          {/* Top Input: Only rounds top corners, removes bottom border to prevent the thick line */}
          {/* Title */}
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g., Grocery List"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Bottom Input: Only rounds bottom corners */}
          {/* Notes */}
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Content</label>
          <textarea
            placeholder="Take a note..."
            rows="4"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </form>
        {/* Button: Aligns perfectly with the bottom input line */}
        <button
          className="bg-blue-600 h-11 px-5 rounded-xl text-white font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20"
          onClick={submitHandler}
        >
          Save note 
        </button>
      </div>

      {/* CARD  */}

      <div className='flex flex-col gap-10 items-center'>
        <h1 className='font-bold text-3xl'>Your Notes</h1>
        <div className='flex flex-wrap gap-5 '>
          {task.map((item, idx) => {
            return <div key={idx} className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group'>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                  {item.note}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end text-xs text-slate-400">
                <span>Just now</span>
              </div>
              <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors duration-200" onClick={DeleteBtn}>
                Delete Note
              </button>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
