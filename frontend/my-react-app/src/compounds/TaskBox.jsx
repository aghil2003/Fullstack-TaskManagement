import React, { useEffect, useState } from "react";
import './taskbox.css';
import AxiosInstance from "../Axios/instance";

const TaskBox = ({ taskUpdated }) => {  
  const [taskCounts, setTaskCounts] = useState({
    Completed: 0,
    Ongoing: 0,
    Pending: 0,
  });

  const fetchCounts = async () => {
    try {
      const response = await AxiosInstance.get("/taskcounts");
      setTaskCounts(response.data);
    } catch (error) {
      console.error("Error fetching task counts:", error.message);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [taskUpdated]);  

  return (
    <div className='taskbox'>
      <div className='emphead1'>Task Counts</div>
      <div className="count"><p>✅ Completed: {taskCounts.Completed}</p></div>
      <div className="count"><p>🕓 Ongoing: {taskCounts.Ongoing}</p></div>
      <div className="count"><p>📌 Pending: {taskCounts.Pending}</p></div>
    </div>
  );
};

export default TaskBox;
