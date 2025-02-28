"use client";

import { useState } from "react";
import { useAuthRedirect } from "../context/authContext"; // Import the hook
import {
  Layout,
  Typography,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Empty,
  Space,
} from "antd";
import {
  PlusOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import CreateBotForm from "./create-bot-form";
import MyHeader from "../components/header";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
  useAuthRedirect(); // Redirects to '/' if user is not authenticated

  const [bots, setBots] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <Layout className="min-h-screen">
      <MyHeader />
      <Header className="bg-white px-4 md:px-6 border-b">
        <div className="max-w-7xl mx-auto py-6 flex justify-between items-center">
          <div>
            <h3 className="!mb-0 text-teal-50 text-3xl font-bold">
              Customer Service Bot Dashboard
            </h3>
            <Text type="secondary">
              Create and manage your AI support agents
            </Text>
          </div>
        </div>
      </Header>

      <Content className="p-4 md:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Button
                type="dashed"
                onClick={showCreateModal}
                style={{ height: "140px" }}
                block
              >
                <div className="flex flex-col items-center gap-2">
                  <CustomerServiceOutlined style={{ fontSize: "24px" }} />
                  <span className="text-lg">Create Support Bot</span>
                </div>
              </Button>
            </Col>
          </Row>

          {/* Bot List or Empty State */}
          <div className="mt-8">
            <Title level={3}>Your Support Bots</Title>
            {bots.length === 0 ? (
              <Card>
                <Empty
                  image={<CustomerServiceOutlined style={{ fontSize: 64 }} />}
                  description={
                    <Space direction="vertical" size={16} align="center">
                      <Text>No support bots created yet</Text>
                      <Paragraph className="max-w-md text-center">
                        Create your first AI support agent to start automating
                        customer service.
                      </Paragraph>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showCreateModal}
                      >
                        Create Your First Support Bot
                      </Button>
                    </Space>
                  }
                />
              </Card>
            ) : (
              <Row gutter={[16, 16]}>{/* Bot cards will be mapped here */}</Row>
            )}
          </div>
        </div>
      </Content>

      {/* Create Bot Modal */}
      <Modal
        title="Create a Customer Service Bot"
        open={isCreateModalOpen}
        onCancel={handleCreateModalCancel}
        footer={null}
        width={800}
      >
        <CreateBotForm
          onSuccess={handleCreateSuccess}
          onCancel={handleCreateModalCancel}
        />
      </Modal>
    </Layout>
  );
};

export default Dashboard;
