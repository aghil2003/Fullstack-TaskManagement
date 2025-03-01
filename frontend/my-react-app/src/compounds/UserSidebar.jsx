import './usersidebar.css';
import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";



const UserSidebar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="SideDiv">
      <div>
      {/* Dashboard */}
      <div className="menu-item">
        <i className="bi bi-house-door-fill me-2"></i> Dashboard
      </div>

      {/* Project Dropdown
      <div className="menu-item" onClick={() => setShowDropdown(!showDropdown)}>
        <i className="bi bi-bag-plus-fill me-2"></i> Project
        <i className={`bi bi-chevron-${showDropdown ? "up" : "down"} ms-2`}></i>
      </div>
      {showDropdown && (
        <ul className="dropdown-menu-custom">
          <li>
            <a className="dropdown-item" href="/pendingTask">Pending</a>
          </li>
          <li>
            <a className="dropdown-item" href="/completedTask">Complete</a>
          </li>
          <li>
            <a className="dropdown-item" href="/ongoingTask">Ongoing</a>
          </li>
        </ul>
      )} */}
      </div>
    </div>
  );
}

export default UserSidebar;