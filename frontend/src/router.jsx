import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Analytics from "./pages/Analytics.jsx";
import Budgets from "./pages/Budgets.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expenses from "./pages/Expenses.jsx";
import Login from "./pages/Login.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Register from "./pages/Register.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/expenses", element: <Expenses /> },
      { path: "/budgets", element: <Budgets /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/analytics", element: <Analytics /> },
    ],
  },
]);
