import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import ScheduledTasks from "./components/ScheduledTasks";
import TriggerTasks from "./components/TriggerTasks";
import Status from "./components/Status";
const { Content } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh", background: "#1a1a1a" }}>
        {isAuthenticated && <Sidebar />}
        <Layout>
          <Content style={{ padding: "0 50px", marginLeft: isAuthenticated ? 200 : 0, background: "#2a2a2a", minHeight: "calc(100vh - 64px)" }}>
            <Routes>
              <Route
                path="/login"
                element={!isAuthenticated ? <LoginPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/status" />}
              />
              <Route
                path="/scheduled-tasks"
                element={isAuthenticated ? <ScheduledTasks /> : <Navigate to="/login" />}
              />
              <Route
                path="/trigger-tasks"
                element={isAuthenticated ? <TriggerTasks /> : <Navigate to="/login" />}
              />
              <Route
                path="/status"
                element={isAuthenticated ? <Status /> : <Navigate to="/login" />}
              />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/status" : "/login"} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;