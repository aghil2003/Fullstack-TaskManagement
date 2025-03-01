import React from 'react'
import './adminsidemain.css';
import Header from './SideHeader';
// import  TaskBox  from './TaskBox';
// import  TaskMembersBox  from './TaskMembersBox';
import AllTask from "./AllTaskBox"
import { Provider } from "react-redux";
import store from "../redux";

const sidemain = () => {
  return (
    <div className='container'>
      <Header/>
      {/* <div className='top-box'>
        <TaskBox/>
        <TaskMembersBox/>
      </div> */}
      <div className='Task'>
      <Provider store={store}>
        <AllTask/>
      </Provider>
      </div>
    </div>
    

  )
}

export default sidemain