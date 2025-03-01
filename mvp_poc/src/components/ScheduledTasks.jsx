import { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";

const ScheduledTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/tasks/?scheduled=true", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        setTasks(response.data.results);
      } catch (error) {
        message.error("Failed to fetch scheduled tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return <div>Scheduled Tasks: {JSON.stringify(tasks)}</div>; // Placeholder display
};

export default ScheduledTasks;