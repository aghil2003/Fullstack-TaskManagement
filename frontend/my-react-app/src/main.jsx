// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import Admin from './pages/Admin.jsx';
// import User from './pages/User.jsx';
// import Login from './pages/LoginPage.jsx';
// import Register from './pages/RegisterPage.jsx';
// import ProtectRoute from './compounds/PrivateRoute.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Login />,
//   },
//   {
//     path: '/register',
//     element: <Register />,
//   },
//   {
//     element: <ProtectRoute />, // 🔹 Wrap protected routes
//     children: [
//       {
//         path: '/admin',
//         element: <Admin />,
//       },
//       {
//         path: '/user',
//         element: <User />,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import Admin from "./pages/Admin.jsx";
import User from "./pages/User.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import PrivateRoute from "./compounds/PrivateRoute.jsx"; 
import CompletedTask from "./pages/CompletedTask.jsx";
import PendingTask from "./pages/PendingTask.jsx";
import OngoingTask from "./pages/OngoingTask.jsx";
import Employee from "./pages/Employees.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    element: <PrivateRoute allowedRoles={["Admin"]} />,
    children: [{ path: "/admin", element: <Admin /> }],
  },
  {
    element: <PrivateRoute allowedRoles={["User"]} />,
    children: [{ path: "/user", element: <User /> }],
  },
  {
    element: <PrivateRoute allowedRoles={["User","Admin"]} />,
    children: [{ path: "/completedTask", element: <CompletedTask /> }],
  },
  {
    element: <PrivateRoute allowedRoles={["User","Admin"]} />,
    children: [{ path: "/pendingTask", element: <PendingTask /> }],
  },
  {
    element: <PrivateRoute allowedRoles={["User","Admin"]} />,
    children: [{ path: "/ongoingTask", element: <OngoingTask /> }],
  },
  {
    element: <PrivateRoute allowedRoles={["User","Admin"]} />,
    children: [{ path: "/employees", element: <Employee /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
