import React, { useEffect, useState } from "react";
import "./test.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/TaskInAdmin";
import Modal2 from "./Modal2";
import Swal from "sweetalert2";
import TaskBox from "./TaskBox";  // ✅ Import TaskBox
import  TaskMembersBox  from './TaskMembersBox';

const Test = () => {
  const dispatch = useDispatch();
  const { completed, ongoing, pending, loading, error } = useSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);  // ✅ Track updates

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, taskUpdated]);  // ✅ Re-fetch on task update

  // Function to trigger updates after a new task is added
  const handleTaskAdded = () => {
    setTaskUpdated((prev) => !prev);  // ✅ Toggle state to trigger re-fetch
  };

 
  const handleOpenModal = () => {
    Swal.fire({
      title: "Add a New Task",
      text: "You are about to add a new task.",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsModalOpen(true);
      }
    });
  };

  return (
    <div className="alltaskContainer">
      <div>
      <div className='top-box'>
      <TaskBox taskUpdated={taskUpdated} />
      <TaskMembersBox />
      </div>

      <button className="taskassingbtn" onClick={() => setIsModalOpen(true)}>
        Add Task
      </button>

      {isModalOpen && (
        <Modal2 
          onClose={() => setIsModalOpen(false)} 
          onTaskAdded={handleTaskAdded}  // ✅ Trigger update on new task
        />
      )}
        {isModalOpen && <Modal2 onClose={() => setIsModalOpen(false)} onTaskAdded={() => dispatch(fetchTasks())} />}
       </div>

      <div className="alltaskinnerbox">
        {/* Task lists */}
        <div className="task1box">
          <div className="head">
            <div className="heading">Completed</div>
            {loading ? (
              <p>Loading tasks...</p>
            ) : completed.length > 0 ? (
              completed.map((task, index) => (
                <div key={index} className="emp-task">
                  <h5>{task.taskTitle}</h5>
                  <p>Task for: {task.username}</p>
                </div>
              ))
            ) : (
              <p>There are no tasks...</p>
            )}
          </div>
        </div>

        <div className="task2box">
          <div className="head">
            <div className="heading">Ongoing</div>
            {loading ? (
              <p>Loading tasks...</p>
            ) : ongoing.length > 0 ? (
              ongoing.map((task, index) => (
                <div key={index} className="emp-task">
                  <h5>{task.taskTitle}</h5>
                  <p>Task for: {task.username}</p>
                </div>
              ))
            ) : (
              <p>There are no tasks...</p>
            )}
          </div>
        </div>

        <div className="task3box">
          <div className="head">
            <div className="heading">Pending</div>
            {loading ? (
              <p>Loading tasks...</p>
            ) : pending.length > 0 ? (
              pending.map((task, index) => (
                <div key={index} className="emp-task">
                  <h5>{task.taskTitle}</h5>
                  <p>Task for: {task.username}</p>
                </div>
              ))
            ) : (
              <p>There are no tasks...</p>
            )}
          </div>
        </div>
        </div>
    </div>
  );
};

export default Test;
