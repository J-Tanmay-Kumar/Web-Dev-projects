import React from 'react'
import Navbar from './navbar';
import Page1Context from './page1Context';

const Section1 = () => {
  return (
    <div className='h-screen w-full'>
        <Navbar/>
        <Page1Context/>
    </div>
  )
}

export default Section1;
