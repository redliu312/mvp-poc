import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { handleLogout, fetchWithAuth } from "../utils/authUtils";

const Status = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWithAuth("http://localhost:8000/api/tasks/", setTasks, setLoading);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 16, justifyContent: "space-between", width: "100%" }}>
        <h2 style={{ color: "#e0e0e0" }}>Task Status</h2>
        <Button type="primary" onClick={() => handleLogout(setIsAuthenticated, navigate)}>
          Logout
        </Button>
      </Space>
      <Table dataSource={tasks} columns={[
        { title: "Task ID", dataIndex: "id", key: "id" },
        { title: "Task Title", dataIndex: "title", key: "title" },
        { title: "Task Args", dataIndex: "args", key: "args" },
      ]} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default Status;