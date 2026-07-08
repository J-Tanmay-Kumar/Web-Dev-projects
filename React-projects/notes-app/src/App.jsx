import React, { useState, useEffect } from 'react'

const App = () => {
  let [title, setTitle] = useState('')
  let [note, setNote] = useState('')
  
  // Initialize state from localStorage if it exists, otherwise start with an empty array
  let [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem('notes_tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  
  // Automatically sync tasks with localStorage whenever the task array changes
  useEffect(() => {
    localStorage.setItem('notes_tasks', JSON.stringify(task))
  }, [task])
  
  const submitHandler = (e) => {
    e.preventDefault()
    let details = [...task]
    details.push({ title, note })
    setTask(details)
    
    setTitle('')
    setNote('')
  }

  const DeleteBtn = (idx)=>{
    let details = [...task]
    details.splice(idx,1)
    setTask(details)
  }
  return (

    <div className='min-h-screen bg-slate-50 text-slate-800 antialiased p-6 md:p-12 flex flex-col items-center gap-12'>
      <h1 className='font-bold text-3xl tracking-tight text-slate-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>Add Notes</h1>
      {/* Wrapped both the form and button in a flex container with items-end */}
      <div className="w-full max-w-md flex flex-col sm:flex-row sm:items-end gap-4 bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <form className='flex-1 flex flex-col gap-3 text-slate-800' >
          {/* Top Input: Only rounds top corners, removes bottom border to prevent the thick line */}
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g., Grocery List"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Bottom Input: Only rounds bottom corners */}
          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Content</label>
            <textarea
              placeholder="Take a note..."
              rows="3"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </form>
        {/* Button: Aligns perfectly with the bottom input line */}
        <button
          className="w-full sm:w-auto h-11 px-5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/15 whitespace-nowrap"
          onClick={submitHandler}
        >
          Save note 
        </button>
      </div>

      {/* CARD  */}

      <div className='w-full max-w-5xl flex flex-col gap-6 items-center'>
        <h1 className='font-bold text-2xl tracking-tight text-slate-900'>Your Notes</h1>
        
        {task.length === 0 ? (
          <p className="text-slate-400 text-sm italic">No notes added yet.</p>
        ) : (
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {task.map((item, idx) => {
              return <div key={idx} className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group min-h-[160px]'>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed break-words line-clamp-4">
                    {item.note}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex justify-end text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                    <span>Just now</span>
                  </div>
                  <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-semibold py-2 px-3 rounded-xl transition-colors duration-200" onClick={() => DeleteBtn(idx)}>
                    Delete Note
                  </button>
                </div>
              </div>
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default App