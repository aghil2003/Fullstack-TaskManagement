import React,{ useContext } from 'react';
import './header.css';
import img from '../assets/task_10008158.png';
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  // const removeToken = () => {
  //   localStorage.removeItem("token"); 
  //   console.log("Token is removed");
  //   logout(); 
  //   window.location.href = "/";
  // };

  return (
    <nav className='navbar'>
      <div className="nav">
        <div className='navlist'>
          <div className='logo'>
            <img src={img} alt="Logo" width="50" height="50" />
          </div>
          <div className='brandName'>
            <a className="navbar-brand" href="#" style={{ color: "#ffffff", fontSize: "30px", fontWeight: 500 }}>
              PlanSync
            </a>
          </div>
        </div>
        <div className='navbtn'>
        <div className='showRole'>
      Welcome, {user?.role || "Guest"}!
    </div>
          <button className='navListBtn' onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
