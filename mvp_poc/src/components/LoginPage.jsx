import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username: values.username,
        password: values.password,
      });

      // Store access token in localStorage
      localStorage.setItem("access_token", response.data.access);
      
      // Store refresh token in a cookie (must be set by backend with HttpOnly flag)
      document.cookie = `refresh_token=${response.data.refresh}; Secure; SameSite=Strict;`;

      // Set default Authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;

      setIsAuthenticated(true);
      message.success("Login successful!");
      navigate("/status");

    } catch (error) {
      message.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto", background: "#2a2a2a", padding: 20, borderRadius: 8 }}>
      <h2 style={{ color: "#e0e0e0" }}>Login</h2>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Please enter username" }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter password" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;