import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      if (values.username === "admin" && values.password === "password") {
        setIsAuthenticated(true);
        message.success("Login successful!");
        navigate("/tasks");
      } else {
        message.error("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <h2>Login</h2>
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