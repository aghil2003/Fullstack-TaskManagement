import { useState } from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AxiosInstance from "../Axios/instance"

function Modal({ onClose }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [priority, setPriority] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User might not be logged in.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; 

      console.log("Decoded Token:", decodedToken);
      console.log("User ID:", userId);

      const response = await AxiosInstance.post("/mytask", {
        taskTitle,
        taskContent,
        userId,
        priority,
      });

      console.log("Task added:", response.data);

      navigate("/user");
      
      onClose();
      
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="modalbackground">
      <div className="modalContainer">
        {/* Close Button */}
        <div className="modalBtn">
          <button onClick={onClose}>
            <i className="bi bi-x-circle"></i>
          </button>
        </div>

        {/* Form */}
        <form id="form2" className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="taskTitle" className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="taskContent" className="form-label">Task Content</label>
            <input
              type="text"
              className="form-control"
              id="taskContent"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              className="form-select"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="" disabled>Choose...</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="col-12" id="Taskbutton">
            <button className="btn btn-primary" type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
