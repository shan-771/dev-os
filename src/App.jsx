import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Github from "./pages/Github";
import AppLayout from "./components/layout/AppLayout";

function Assistant() {
  return <div>AI Assistant</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <AppLayout active="dashboard">
              <Dashboard />
            </AppLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <AppLayout active="projects">
              <Projects />
            </AppLayout>
          }
        />

        <Route
          path="/tasks"
          element={
            <AppLayout active="tasks">
              <Tasks />
            </AppLayout>
          }
        />

        <Route
          path="/github"
          element={
            <AppLayout active="github">
              <Github />
            </AppLayout>
          }
        />

        <Route
          path="/assistant"
          element={
            <AppLayout active="assistant">
              <Assistant />
            </AppLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;