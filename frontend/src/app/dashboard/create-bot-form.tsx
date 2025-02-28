"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  ColorPicker,
  Button,
  Space,
  message,
  Card,
  Typography,
} from "antd";
import {
  RobotOutlined,
  MessageOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

interface CreateBotFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface QAPair {
  question: string;
  answer: string;
  category: string;
}

interface BotFormData {
  name: string;
  description: string;
  welcomeMessage: string;
  primaryColor: string;
  channels: string[];
  trainingData: QAPair[];
}

const categories = [
  "General",
  "Product Information",
  "Pricing",
  "Shipping",
  "Returns",
  "Technical Support",
  "Account Issues",
  "Payment",
  "Other",
];

const CreateBotForm: React.FC<CreateBotFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: BotFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create bot");
      }

      const data = await response.json();
      message.success("Customer service bot created successfully!");
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating bot:", error);
      message.error("Failed to create bot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[70vh] overflow-y-auto px-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          primaryColor: "#1677ff",
          channels: ["web"],
          trainingData: [{ question: "", answer: "", category: "General" }],
        }}
      >
        {/* Basic Information Section */}
        <Card className="mb-4">
          <Title level={5}>
            <CustomerServiceOutlined className="mr-2" />
            Basic Information
          </Title>
          <Form.Item
            label="Bot Name"
            name="name"
            rules={[
              { required: true, message: "Please enter a name for your bot" },
              { min: 3, message: "Name must be at least 3 characters" },
            ]}
          >
            <Input
              prefix={<RobotOutlined />}
              placeholder="e.g., Customer Support Assistant"
              maxLength={50}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea
              placeholder="Describe what your customer service bot does"
              autoSize={{ minRows: 2, maxRows: 4 }}
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="Welcome Message"
            name="welcomeMessage"
            rules={[
              { required: true, message: "Please enter a welcome message" },
            ]}
          >
            <Input
              prefix={<MessageOutlined />}
              placeholder="e.g., Hello! I'm here to help with your questions."
            />
          </Form.Item>
        </Card>

        {/* Appearance Section */}
        <Card className="mb-4">
          <Title level={5}>
            <PlusOutlined className="mr-2" />
            Appearance & Channels
          </Title>
          <Form.Item
            label="Primary Color"
            name="primaryColor"
            rules={[
              { required: true, message: "Please select a primary color" },
            ]}
          >
            <ColorPicker
              presets={[
                {
                  label: "Recommended",
                  colors: [
                    "#1677ff", // Blue
                    "#00b96b", // Green
                    "#722ed1", // Purple
                    "#eb2f96", // Pink
                    "#faad14", // Gold
                    "#13c2c2", // Cyan
                  ],
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Channels"
            name="channels"
            rules={[
              {
                required: true,
                message: "Please select at least one channel",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select channels"
              optionLabelProp="label"
            >
              <Option value="web" label="Website">
                <Space>
                  <span role="img" aria-label="web">
                    🌐
                  </span>
                  Website Widget
                </Space>
              </Option>
              <Option value="whatsapp" label="WhatsApp">
                <Space>
                  <span role="img" aria-label="whatsapp">
                    📱
                  </span>
                  WhatsApp
                </Space>
              </Option>
              <Option value="messenger" label="Messenger">
                <Space>
                  <span role="img" aria-label="messenger">
                    💬
                  </span>
                  Facebook Messenger
                </Space>
              </Option>
              <Option value="telegram" label="Telegram">
                <Space>
                  <span role="img" aria-label="telegram">
                    ✈️
                  </span>
                  Telegram
                </Space>
              </Option>
            </Select>
          </Form.Item>
        </Card>

        {/* Training Data Section */}
        <Card className="mb-4">
          <Space className="w-full justify-between mb-4">
            <Title level={5}>
              <QuestionCircleOutlined className="mr-2" />
              Training Data
            </Title>
            <Button
              type="link"
              onClick={() => {
                const trainingData = form.getFieldValue(
                  "trainingData"
                ) as QAPair[];
                form.setFieldValue("trainingData", [
                  ...trainingData,
                  { question: "", answer: "", category: "General" },
                ]);
              }}
            >
              Add Q&A Pair
            </Button>
          </Space>

          <Form.List name="trainingData">
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    size="small"
                    className="bg-gray-50 dark:bg-gray-800"
                    title={`Q&A Pair ${index + 1}`}
                    extra={
                      fields.length > 1 && (
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                        />
                      )
                    }
                  >
                    <Form.Item
                      {...field}
                      key={`${field.key}-category`}
                      label="Category"
                      name={[field.name, "category"]}
                      rules={[
                        { required: true, message: "Please select a category" },
                      ]}
                    >
                      <Select placeholder="Select a category">
                        {categories.map((category) => (
                          <Option key={category} value={category}>
                            {category}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...field}
                      key={`${field.key}-question`}
                      label="Question"
                      name={[field.name, "question"]}
                      rules={[
                        { required: true, message: "Please enter a question" },
                      ]}
                    >
                      <Input placeholder="e.g., What are your shipping options?" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      key={`${field.key}-answer`}
                      label="Answer"
                      name={[field.name, "answer"]}
                      rules={[
                        { required: true, message: "Please enter an answer" },
                      ]}
                    >
                      <TextArea
                        placeholder="e.g., We offer standard (5-7 days) and express (1-2 days) shipping options."
                        autoSize={{ minRows: 2, maxRows: 4 }}
                      />
                    </Form.Item>
                  </Card>
                ))}
              </div>
            )}
          </Form.List>
        </Card>

        {/* Form Actions */}
        <Form.Item className="mb-0">
          <Space className="w-full justify-end">
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Customer Service Bot
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBotForm;
