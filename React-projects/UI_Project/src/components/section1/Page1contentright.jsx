import React from 'react'
import RightCard from './RightCard'

const Page1contentright = (props) => {
  return (
    <div id='right' className=' flex justify-between gap-7  flex-nowrap p-4 h-full w-2/3 overflow-x-auto'>
      {props.users.map(function(elem,idx){
        return <RightCard  key={idx} id={idx} img ={elem.img} tag={elem.tag} intro={elem.intro} />
      })}
    </div>
  )
}

export default Page1contentright
