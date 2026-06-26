import React from 'react'
import Section1 from './components/section1/Section1'
import Section2 from './components/section2/Section2'
import Section3 from './components/Section3/Section3'
import RightCard from './components/section1/RightCard'
const App = () => {
  const users =[
    {
      img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro:'Prime customers that have acess to the bank credit and are satisfied with the current product',
      tag:'Statisfied'
    },
    {
      img:'https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro:'Prime customers that have acess to the bank credit and are not satisfied with the current service',
      tag:'Underserved'
    },
    {
      img:'https://plus.unsplash.com/premium_photo-1661769159995-f3af0089875f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro:'Customers from near-prime and sub-prime segments with no access to bank Credit',
      tag:'Underbanked'
    }
  ]
  return (
    <div>
        <Section1 users={users}/>
    </div>
  )
}

export default App
