import React from 'react'
import RightCardContent from './RightCardContent'

const RightCard = (props) => {
  return (
    <div className='h-full w-60 bg-amber-100 rounded-3xl overflow-hidden relative shrink-0'>
        <img  className='h-full w-full object-cover' src={props.img} alt="" />
        <RightCardContent tag={props.tag} intro={props.intro} id={props.id}/>
    </div>
  )
}

export default RightCard
