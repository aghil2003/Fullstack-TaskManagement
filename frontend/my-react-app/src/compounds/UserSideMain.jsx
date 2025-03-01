import React from 'react'
import './usersidemain.css'
import Header from '../compounds/UserHeader'
import Sidemain from '../compounds/UserAssinedTaskBox'

const UserSideMain = () => {
  return (
    <div className='usercontainer'>
     <div>
     <Header/>
     </div> 
     <div className='sidebar'>
     <Sidemain/>
     </div> 
    </div>
   
  )
}
export default UserSideMain