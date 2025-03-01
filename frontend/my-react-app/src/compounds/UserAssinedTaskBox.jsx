import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import instance from "../Axios/instance";
import "./userasinedtaskbox.css";

const UserAssignedTaskBox = () => {
  const { user, isLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    if (!user || isLoading) return;

    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get(`/TaskForUser/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(response.data);
        setSelectedStatus(
          response.data.reduce((acc, task) => ({ ...acc, [task._id]: task.status }), {})
        );
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user, isLoading]);

  const handleStatusChange = (taskId, newStatus) => {
    setSelectedStatus((prev) => ({ ...prev, [taskId]: newStatus }));
  };

  const handleUpdateClick = async (taskId) => {
    const newStatus = selectedStatus[taskId];

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to update this task to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await instance.put(
        `/updateTask/${taskId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );

        if (newStatus === "Completed") {
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        }

        Swal.fire("Updated!", `Task has been updated to "${newStatus}".`, "success");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      Swal.fire("Error", "Failed to update task status. Try again.", "error");
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (!tasks.length) return <p>No tasks assigned.</p>;

  return (
    <div className="task-container">
      <div id="listboxHeader">Your Assigned Tasks</div>
      <div className="listbox">
        {tasks.map((task) => (
          <div className="innerlistbox" key={task._id}>
            <div className="box1">
              <div id="listTitle">
                <h3>{task.taskTitle}</h3>
              </div>
              <div>
                <p>{task.taskContent}</p>
              </div>
            </div>
            <div className="box2">
              <div id="box2inner">
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
              </div>
              <div>
                <select
                  className="status-dropdown"
                  value={selectedStatus[task._id] || task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => handleUpdateClick(task._id)} disabled={selectedStatus[task._id] === task.status}>Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAssignedTaskBox;
