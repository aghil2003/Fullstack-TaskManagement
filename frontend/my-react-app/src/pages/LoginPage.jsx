import React from 'react'
import Header from '../compounds/AuthHeader'
import Login from '../compounds/login'
import Img from '../assets/42.jpg'
import './login.css'


function LoginPage() {
  return (
    <>
    <Header/>
    <div className='logcontainer'>
      <div className='loginbox'>
        <Login/>
      </div>
      <div className='imgbox'>
      <img src={Img} style={{"width":"500px","height":"500px"}}/>;
      </div>
    </div>
    </>
  )
}

export default LoginPage