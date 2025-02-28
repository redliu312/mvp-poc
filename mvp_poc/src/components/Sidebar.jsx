import { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: "/scheduled-tasks", label: "Scheduled Tasks" },
    { key: "/trigger-tasks", label: "Trigger Tasks" },
    { key: "/status", label: "Status" },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={200}>
      <div style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)" }} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;