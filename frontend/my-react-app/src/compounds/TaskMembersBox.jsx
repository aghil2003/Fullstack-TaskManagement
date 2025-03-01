import React, { useEffect, useState } from 'react';
import './taskmembersbox.css';
import AxiosInstance from "../Axios/instance"
const TaskMembersBox = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
  
        const response= await AxiosInstance.get("/employees")
        console.log("Full API Response:", response);
        const data = response.data;
        
        const usernames = data.map(user => user.username);

        
        setEmployees(usernames);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className='taskempbox'>
      <div className='emphead'>Employees</div>
      {employees.length > 0 ? (
  employees.map((employees, index) => (
    <div key={index} className='emp-item'>
      <p>{employees}</p> {/* Display username correctly */}
    </div>
  ))
) : (
  <p>Loading employees...</p>
)}

    </div>
  );
};

export default TaskMembersBox;
