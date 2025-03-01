import React from 'react'
import InputPage from '../compounds/Register'
import Img from '../assets/2.jpg'
import Header from '../compounds/AuthHeader'
import './register.css'

function RegisterPage() {
  return (
    <>
    <Header/>
    <div className='regcontainer'>
      <div className='registerbox'>
        <InputPage/>
      </div>
      <div className='imgbox2'>
      <img src={Img} style={{"width":"500px","height":"500px"}}/>;
      </div>
    </div>
    </>
  )
}

export default RegisterPage