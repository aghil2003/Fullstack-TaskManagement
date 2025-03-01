import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
    trim: true,
  },
  taskContent: {
    type: String,
    required: true,
    trim: true,
  },
  taskFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  status:{
    type: String,
    enum: ["Completed", "Pending", "Ongoing"],
    default: "Pending",
    required: true,
  },
}, { timestamps: true });


const Task = mongoose.model("Task", TaskSchema);
export default Task;
