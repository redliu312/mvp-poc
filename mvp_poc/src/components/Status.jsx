import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const Status = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockTasks = [
        { id: 1, title: "Process Data", args: "file1.csv" },
        { id: 2, title: "Generate Report", args: "2025-02-27" },
        { id: 3, title: "Send Email", args: "user@example.com" },
      ];
      setTasks(mockTasks);
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    { title: "Task ID", dataIndex: "id", key: "id" },
    { title: "Task Title", dataIndex: "title", key: "title" },
    { title: "Task Args", dataIndex: "args", key: "args" },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 16, justifyContent: "space-between", width: "100%" }}>
        <h2>Task Status</h2>
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Space>
      <Table dataSource={tasks} columns={columns} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default Status;