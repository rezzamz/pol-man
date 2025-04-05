import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Input, Select } from 'antd';
import { createHall } from '../../services/api';
import './Halls.css';

const { Option } = Select;

const Halls: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [halls, setHalls] = useState<any[]>([]);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values: any) => {
    try {
      const newHall = await createHall(values);
      setHalls([...halls, newHall]);
      setIsModalVisible(false);
      navigate(`/dashboard/halls/${newHall.id}`, { state: { budgetType: values.budgetType } });
    } catch (error) {
      console.error('Failed to create hall:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="halls-container">
      <h2>My Halls</h2>
      <div className="card-box" onClick={showModal}>
        <div className="add-icon">+</div>
      </div>
      <Modal title="Add Hall" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleOk}>
          <Form.Item name="hallName" label="Hall Name" rules={[{ required: true, message: 'Please input the hall name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="importerName" label="Importer Name" rules={[{ required: true, message: 'Please input the importer name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="chickenCount" label="Number of Chickens" rules={[{ required: true, message: 'Please input the number of chickens!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="chickenType" label="Type of Chickens" rules={[{ required: true, message: 'Please select the type of chickens!' }]}>
            <Select placeholder="Select a type">
              <Option value="broiler">Broiler</Option>
              <Option value="layer">Layer</Option>
              <Option value="free-range">Free-range</Option>
            </Select>
          </Form.Item>
          <Form.Item name="initialWeight" label="Initial Weight" rules={[{ required: true, message: 'Please input the initial weight!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="budgetType" label="Budget Type" rules={[{ required: true, message: 'Please select the budget type!' }]}>
            <Select placeholder="Select a budget type">
              <Option value="standard">Standard</Option>
              <Option value="premium">Premium</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="halls-list">
        {halls.map((hall, index) => (
          <div key={index} className="hall-item">
            <h3>{hall.hallName}</h3>
            <p>Importer: {hall.importerName}</p>
            <p>Number of Chickens: {hall.chickenCount}</p>
            <p>Type of Chickens: {hall.chickenType}</p>
            <p>Initial Weight: {hall.initialWeight} kg</p>
            <Button onClick={() => navigate(`/dashboard/halls/${hall.id}`, { state: { budgetType: hall.budgetType } })}>View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Halls;