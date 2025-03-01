import User from "../modles/user.js"
import Task from "../modles/Task.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  
    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    // Send response (excluding password)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      },
      token, 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Changed userName to username

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getemp = async (req, res) => {
  try {
    const emp = await User.find({ role: "User" });
    const usernames = emp.map(user => user.username);

    if (usernames.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
     res.send(emp)
    // res.status(200).json(emp); 
  } catch (error) {
    console.error("Error fetching usernames:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getemp = async (req, res) => {
//   try {
//     const emp = await User.find({ role: "User" });
//     const usernames = emp.map(user => user.username);

//     if (usernames.length === 0) {
//       return res.status(404).json({ message: "No users found" });
//     }

//     res.status(200).json(usernames); // ✅ Send JSON response
//   } catch (error) {
//     console.error("Error fetching usernames:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const assineTask= async(req,res)=>{
    try {
      const { taskTitle,taskContent, taskFor, priority } = req.body; 
  
      const user = await User.findOne({ username: taskFor });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new task with ObjectId of the user
    const newTask = new Task({
      taskTitle,
      taskContent,
      taskFor: user._id, // Use the ObjectId of the user
      priority,
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully", newTask });

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const taskList =  async (req, res) => {
  try {
      const { userId } = req.params;
      console.log("Received userId:", userId); 

      if (!mongoose.Types.ObjectId.isValid(userId)) {
          console.error("Invalid userId:", userId);
          return res.status(400).json({ message: "Invalid user ID" });
      }

      // Fetch tasks where taskFor is the userId and status is not 'completed'
      const tasks = await Task.find({ 
          taskFor: userId, 
          status: { $ne: 'Completed' } // Exclude tasks with status 'completed'
      });
      console.log("Fetched tasks:", tasks);
      
      res.json(tasks);
  } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

export const mytask=async (req,res)=>{
  try {
    const { taskTitle,taskContent, userId, priority } = req.body; 

    

  

  // Create new task with ObjectId of the user
  const newTask = new MyTask({
    taskTitle,
    taskContent,
    user: userId, 
    priority,
  });

  await newTask.save();
  res.status(201).json({ message: "Task created successfully", newTask });

} catch (error) {
  console.error("Error creating task:", error);
  res.status(500).json({ message: "Internal server error" });
}
}


export const MytaskList = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Received task userId:", userId);
    console.log("Type of userId:", typeof userId);

    // // ✅ Validate ObjectId before querying
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: "Invalid User ID" });
    // }

    // const objectId = new mongoose.Types.ObjectId(userId);
    // console.log("Converted ObjectId:", objectId);

    // ✅ Fetch tasks belonging to the user
    const tasks = await MyTask.find({ user: 'userId' });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    console.log("Fetched tasks:", tasks);
    res.json(tasks);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const completed = async (req, res) => {
  try {
    const completedTasks = await Task.find({ status: "Completed" }); // ✅ Add "await" to resolve the promise

    console.log("Fetched completed tasks:", completedTasks);
    res.json(completedTasks); // ✅ Send the data properly
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const ongoing=async (req, res) => {
    try {
      const ongoingTasks = await Task.find({ status: "Ongoing" }); // ✅ Fix variable name
  
      console.log("Fetched ongoing tasks:", ongoingTasks);
      res.json(ongoingTasks);
    } catch (error) {
      console.error("Error fetching ongoing tasks:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }

export const pending= async(req,res)=>{
  try {
    const pendingTasks = await Task.find({ status: "Pending" }); // ✅ Fix variable name
    console.log("Fetched ongoing tasks:", pendingTasks);
    res.json(pendingTasks);
  } catch (error) {
    console.error("Error fetching ongoing tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export const getTaskCounts = async (req, res) => {
  try {
    const taskCounts = await Task.aggregate([
      {
        $group: {
          _id: "$status", // Group by status
          count: { $sum: 1 }, // Count occurrences
        },
      },
    ]);

    // Convert array result to an object for better readability
    const formattedCounts = {
      completed: 0,
      ongoing: 0,
      pending: 0,
    };

    taskCounts.forEach(({ _id, count }) => {
      formattedCounts[_id] = count; // Assign count to the respective status
    });
     
    res.send(formattedCounts);
  } catch (error) {
    console.error("Error fetching task counts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCompletedTask = async (req, res) => {
  try {
    const completedTasks = await Task.find({ status: "Completed" }); // Fetch all tasks where status is "completed"

    console.log("Completed Tasks:", completedTasks); // Debugging
    res.json(completedTasks); // Send the list of tasks as a response

  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const update =async (req, res) => {
  try {
      const { taskId } = req.params;
      const { status } = req.body;

      console.log("Received update request for Task ID:", taskId); // Debugging log
      console.log("New Status:", status);

      if (!taskId) {
          return res.status(400).json({ message: "Task ID is required" });
      }
      if (!status) {
          return res.status(400).json({ message: "Status is required" });
      }

      const updatedTask = await Task.findByIdAndUpdate(
          taskId,  // ✅ Make sure taskId is correct
          { status },
          { new: true }
      );

      if (!updatedTask) {
          return res.status(404).json({ message: "Task not found" });
      }

      res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteTask=async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find task by ID and ensure it belongs to the authenticated user
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user) {
      return res.status(403).json({ message: "You are not authorized to delete this task" });
    }

    await task.remove(); // Delete the task

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

