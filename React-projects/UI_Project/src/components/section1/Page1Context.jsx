import React from 'react'
import Page1contentright from './Page1contentright.jsx'
import Page1contentleft from './Page1contentleft'

const Page1Context = (props) => {
  return (
    <div className='flex gap-10 pb-20 pt-6 h-[85vh] items-center px-18'>
        <Page1contentleft/>
        <Page1contentright users={props.users}/>
    </div>
  )
}

export default Page1Context
