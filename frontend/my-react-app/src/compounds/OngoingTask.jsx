import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/TaskInAdmin";
import { Link } from "react-router-dom";
import "./ongoingTask.css"

const OngoingTaskPage = () => {  
  const dispatch = useDispatch();
  const { ongoing, loading, error } = useSelector((state) => state.tasks); 
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
    <button className="empbtn">
              <Link to="/admin" className="Btnback">
                  <i className="bi bi-house-door-fill me-2">Back</i>
              </Link>
            </button>
    <div className="taskPage-container">
      <h2>Ongoing Tasks</h2>
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : ongoing.length > 0 ? (  
        <table className="task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Task For</th>
              <th>Priority</th>
              <th>Assigned Date</th>
            </tr>
          </thead>
          <tbody>
            {ongoing.map((task, index) => (  
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.taskTitle}</td>
                <td>{task.username || "N/A"}</td> 
                <td>{task.priority}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No ongoing tasks found.</p>
      )}
    </div>
    </>
  );
};

export default OngoingTaskPage; 
