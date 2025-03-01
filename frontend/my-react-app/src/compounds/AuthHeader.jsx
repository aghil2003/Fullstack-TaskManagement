import React from 'react';
import './header.css';
import img from '../assets/task_10008158.png';

const Header = () => {
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
      </div>
    </nav>
  );
};

export default Header;
