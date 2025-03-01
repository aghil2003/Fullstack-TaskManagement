import express from "express";
const Route=express();
import { register,login,getemp,assineTask,taskList,mytask,MytaskList,completed,ongoing,pending,getTaskCounts,update,getCompletedTask } from '../controller/authController.js'


Route.post('/api/register',register);
Route.post('/api',login);
Route.get('/api/employees',getemp);
Route.post('/api/taskassine',assineTask)
Route.get("/api/TaskForUser/:userId",taskList);
Route.post("/api/mytask",mytask);
Route.get("/api/MyTask/:userId",MytaskList);
Route.get("/api/completedtask",completed);
Route.get("/api/ongoingtask",ongoing );
Route.get("/api/pendingtask",pending);
Route.get("/api/taskcounts", getTaskCounts);
Route.put("/api/updateTask/:taskId",update );




export default Route;