import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../Axios/instance";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const completedRes = await AxiosInstance.get("/completedtask");
  const ongoingRes = await AxiosInstance.get("/ongoingtask");
  const pendingRes = await AxiosInstance.get("/pendingtask");
  const usersRes = await AxiosInstance.get("/employees");
   
  const users = usersRes.data;
  console.log(users,"ertyu");
  
  console.log("Task Data:", completedRes.data); 
  console.log("User Data:", users); 

  const mapUsernames = (tasks) =>
    tasks.map((task) => ({
      ...task,
      username: users.find((user) => user._id === task.taskFor)?.username || "Unknown",
    }));
  
  

  return {
    completed: mapUsernames(completedRes.data),
    ongoing: mapUsernames(ongoingRes.data),
    pending: mapUsernames(pendingRes.data),
  };
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    completed: [],
    ongoing: [],
    pending: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.completed = action.payload.completed;
        state.ongoing = action.payload.ongoing;
        state.pending = action.payload.pending;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch tasks.";
      });
  },
});

export default taskSlice.reducer;
