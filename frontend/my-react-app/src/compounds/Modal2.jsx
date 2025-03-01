import { useState, useEffect } from "react";
import "./model2.css";
import AxiosInstance from "../Axios/instance"

function Modal2({ onClose, onTaskAdded, }) { 
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [taskFor, setTaskFor] = useState("");
  const [priority, setPriority] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await AxiosInstance.get("/employees");

        const data = response.data;
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form...");
      const response = await AxiosInstance.post("/taskassine", {
        taskTitle,
        taskContent,
        taskFor,
        priority,
      });
  
      console.log("Task assigned successfully:", response.data);
      
      if (response.status === 201) { 
        await onTaskAdded(); 
        onClose();
      }
  
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };
  

  return (
    <div className="modalbackground">
      <div className="modalContainer1">
        <div className="modalBtn">
          <button onClick={onClose}>
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
        <form id="form1" className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="taskTitle" className="form-label">Task Title</label>
            <input type="text" className="form-control" id="taskTitle" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
          </div>

          <div className="col-12">
            <label htmlFor="taskContent" className="form-label">Task Content</label>
            <input type="text" className="form-control" id="taskContent" value={taskContent} onChange={(e) => setTaskContent(e.target.value)} required />
          </div>

          <div className="col-12">
            <label htmlFor="taskFor" className="form-label">Task For</label>
            <select className="form-select" id="taskFor" value={taskFor} onChange={(e) => setTaskFor(e.target.value)} required>
              <option value="" disabled>Choose Employee...</option>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <option key={index} value={employee.username}>{employee.username}</option>
                ))
              ) : (
                <option disabled>Loading employees...</option>
              )}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select className="form-select" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required>
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
export default Modal2;