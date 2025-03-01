import './user.css';

import React from 'react'
import Header from '../compounds/Header';
import Sidebar from '../compounds/UserSidebar';
import Sidemain from '../compounds/UserSideMain';

 const User = () => {
  return (
    <>
     <Header/>
     <div className='UserHero'>
     <div className='maindiv1'>
     <Sidebar/>
     </div>
     <div className='maindiv2'>
     <Sidemain/>
     </div>
     </div>
    
    </>
   
  )
}
 export default User;