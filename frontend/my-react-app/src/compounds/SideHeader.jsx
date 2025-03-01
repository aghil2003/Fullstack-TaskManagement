

import React from 'react';
import './sideheader.css'

const SideHeader = () => {

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div id="btndivadmin" className="container-fluid">
          <div>
          <a class="navbar-brand">Task Management</a>
          </div>
          <div id='adminaddbtn'>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideHeader