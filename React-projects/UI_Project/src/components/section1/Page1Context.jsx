import React from 'react'
import Page1contentright from './Page1contentright'
import Page1contentleft from './Page1contentleft'

const Page1Context = () => {
  return (
    <div className='flex gap-10 py-10 px-18 h-[85vh] items-center'>
        <Page1contentleft/>
        <Page1contentright/>
    </div>
  )
}

export default Page1Context
