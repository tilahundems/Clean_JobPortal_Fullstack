import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

interface Props {
  onToggle: () => void;
}

export default function AppHeader({ onToggle }: Props) {
  return (
    <Header className="bg-white shadow flex items-center justify-between px-4">
      <Button
        type="text"
        icon={<MenuOutlined />}
        className="max-sm:hidden border-orange-900" // hide on Medium screens
        onClick={onToggle}
        
      />
      {/* <h1 className="text-lg font-bold">Job Portal</h1> */}
      {/* <div>Right-side actions (user menu, logout, etc.)</div> */}
    </Header>
  );
}
