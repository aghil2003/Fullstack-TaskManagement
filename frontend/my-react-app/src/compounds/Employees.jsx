import React, { useState, useEffect } from "react";
import "./employee.css";
import Axiosinstance from "../Axios/instance";
import { Link } from "react-router-dom";

const CompletedTakPage = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await Axiosinstance.get("/employees"); 
        setEmployees(response.data)
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="empcontainer">
      <button className="empbtn">
        <Link to="/admin" className="empbtn1">
            <i className="bi bi-house-door-fill me-2">Back</i>
        </Link>
      </button>
      {employees.length > 0 ? (
        employees.map((emp) => (
          <div className="empbox" key={emp.id}>
            <div className="empbox1"><strong>Employee :</strong> {emp.username}</div>
            <div className="empbox2"><strong>User Email :</strong> {emp.email}</div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CompletedTakPage;
