import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import HomePage from "./pages/HomePage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import AddTaskPage from "./pages/AddTaskPage.jsx";
import TaskDetailPage from "./pages/TaskDetailPage.jsx";

const App = () => {
  // Set the theme based on localStorage or default to light
  localStorage.getItem("theme") || localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
  return (
    <div className="bg-base-200 px-8">
      <Navbar />
      <div className="flex gap-2 h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-base-100 rounded-xl overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/add-task" element={<AddTaskPage />} />
            <Route path="/task/:id" element={<TaskDetailPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
