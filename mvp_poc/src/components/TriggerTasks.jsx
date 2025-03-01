import { useState, useEffect } from "react";
import { message, Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchWithAuth } from "../utils/authUtils"; // Reusing auth utils

const TriggerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [triggerLoading, setTriggerLoading] = useState(false);
  const [showStatusButton, setShowStatusButton] = useState(false); // Show "Go to Status" button
  const [triggeredTask, setTriggeredTask] = useState(null); // Store the triggered task details
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    fetchWithAuth("http://localhost:8000/api/tasks/?trigger=true", setTasks, setLoading);
  }, []);

  // Function to trigger a new task
  const triggerTask = async () => {
    setTriggerLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/tasks/trigger/", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });

      message.success(`Task triggered successfully! Task ID: ${response.data.id}`);
      setTriggeredTask(response.data); // Store triggered task data
      setShowStatusButton(true); // Show "Go to Status" button after success
    } catch (error) {
      message.error("Failed to trigger task");
    } finally {
      setTriggerLoading(false);
    }
  };

  const columns = [
    { title: "Task ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Args", dataIndex: "args", key: "args" },
    { title: "Scheduled", dataIndex: "is_scheduled", key: "is_scheduled", render: value => value ? "Yes" : "No" },
    { title: "Triggered", dataIndex: "is_triggered", key: "is_triggered", render: value => value ? "Yes" : "No" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "User", dataIndex: ["user", "username"], key: "user", render: (text, record) => record.user ? record.user.username : "N/A" },
    { title: "User Email", dataIndex: ["user", "email"], key: "user_email", render: (text, record) => record.user ? record.user.email : "N/A" }
    ];

  return (
    <div style={{ padding: 20 }}>
      <Space direction="vertical">
        <Button type="primary" onClick={triggerTask} loading={triggerLoading}>
          Trigger Task
        </Button>
        {showStatusButton && (
          <Button type="default" onClick={() => navigate("/status")}>
            Go to Status Page
          </Button>
        )}
      </Space>

      {/* Display Triggered Task Details */}
      {triggeredTask && (
        <div style={{ marginTop: 20 }}>
          <h3>Triggered Task Details:</h3>
          <Table dataSource={[triggeredTask]} columns={columns} rowKey="id" pagination={false} />
        </div>
      )}

      {/* Display Previously Triggered Tasks */}
      <div style={{ marginTop: 20 }}>
        <h3>Previously Triggered Tasks:</h3>
        <Table dataSource={tasks} columns={columns} rowKey="id" loading={loading} />
      </div>
    </div>
  );
};

export default TriggerTasks;