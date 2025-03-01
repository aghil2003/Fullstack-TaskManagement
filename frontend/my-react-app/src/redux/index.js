import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./TaskInAdmin";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
