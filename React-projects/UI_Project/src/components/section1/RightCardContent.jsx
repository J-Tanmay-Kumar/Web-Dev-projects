import React from 'react'

const RightCardContent = (props) => {
  return (
    <div className='h-full w-full absolute top-0 left-0  p-6 flex flex-col justify-between'>
            <h2 className='h-10 w-10 rounded-full flex justify-center items-center bg-amber-50'>{props.id+1}</h2>
            <div>
              <p className='text-white mb-10 font-medium leading-relaxed text-shadow-2xs'>{props.intro}</p>
              <div className='flex justify-between'>
                <button className='bg-blue-600 px-7 py-1.5 rounded-full text-white font-medium'>
                  {props.tag}
                </button>
                <button className='bg-blue-600 rounded-full text-white px-4 py-1.5'><i className="ri-arrow-right-line"></i></button>
              </div>
            </div>
    </div>
  )
}

export default RightCardContent
