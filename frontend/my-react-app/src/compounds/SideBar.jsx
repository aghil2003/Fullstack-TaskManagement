import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css"; 
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const initialStyle = {
    width: "250px",
    height: "490px",
    backgroundColor: "#4c3575",
    color: "#ffffff",
    padding: "15px",
    borderRadius: "15px",
    position: "relative",
  };

  const minimizedStyle = {
    width: "50px",
    height: "480px",
    backgroundColor: "#4c3575",
    color: "#ffffff",
    padding: "5px",
    borderRadius: "15px",
    position: "relative",
  };

  const [style, setStyle] = useState(initialStyle);
  const [iconClass, setIconClass] = useState("bi bi-arrow-bar-left");
  const [showDropdown, setShowDropdown] = useState(false);

  const changeStyle = () => {
    setStyle((prevStyle) =>
      prevStyle.width === "250px" ? minimizedStyle : initialStyle
    );
    setIconClass((prevIcon) =>
      prevIcon === "bi bi-arrow-bar-left" ? "bi bi-arrow-bar-right" : "bi bi-arrow-bar-left"
    );
  };

  return (
    <div className="SideDiv" style={style}>
      <div>
        {/* Dashboard */}
        <div className={`menu-item ${location.pathname === "/admin" ? "active" : ""}`}>
          <Link to="/admin" className="sidebarbtn d-flex align-items-center">
            <i className="bi bi-house-door-fill me-2"></i>
            {style.width !== "50px" && "Dashboard"}
          </Link>
        </div>

        {/* Project Dropdown */}
        <div
          className={`menu-item ${
            ["/pendingTask", "/completedTask", "/ongoingTask"].includes(location.pathname)
              ? "active"
              : ""
          }`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <i className="bi bi-bag-plus-fill me-2"></i>
          {style.width !== "50px" && "Project"}
          {style.width !== "50px" && (
            <i className={`bi bi-chevron-${showDropdown ? "up" : "down"} ms-2`}></i>
          )}
        </div>
        {showDropdown && style.width !== "50px" && (
          <ul className="dropdown-menu-custom">
            <li>
              <Link
                className={`dropdown-item ${
                  location.pathname === "/pendingTask" ? "active" : ""
                }`}
                to="/pendingTask"
              >
                Pending
              </Link>
            </li>
            <li>
              <Link
                className={`dropdown-item ${
                  location.pathname === "/completedTask" ? "active" : ""
                }`}
                to="/completedTask"
              >
                Complete
              </Link>
            </li>
            <li>
              <Link
                className={`dropdown-item ${
                  location.pathname === "/ongoingTask" ? "active" : ""
                }`}
                to="/ongoingTask"
              >
                Ongoing
              </Link>
            </li>
          </ul>
        )}

        {/* Employee */}
        <div className={`menu-item ${location.pathname === "/employees" ? "active" : ""}`}>
          <Link to="/employees" className="sidebarbtn d-flex align-items-center">
            <i className="bi bi-person-circle me-2"></i>
            {style.width !== "50px" && "Employee"}
          </Link>
        </div>
      </div>

      {/* Back Button */}
      <button id="backbtn" onClick={changeStyle}>
        <i className={iconClass}></i>
      </button>
    </div>
  );
};

export default Sidebar;
