import React, { useState, useEffect } from 'react';
import { Modal, Select, message,Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createHall, fetchHalls, deleteHall } from '../../services/api'; // Import deleteHall
import './Halls.css';

const { Option } = Select;

interface Hall {
  id: string;
  hallName: string;
  importerName: string;
  chickenCount: number;
  chickenType: string;
  initialWeight: number;
  budgetType: string;
}

const Halls: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]); // سالن‌ها
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // حالت بارگذاری برای نمایش وضعیت بارگذاری
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // بارگذاری سالن‌ها از localStorage یا API
  useEffect(() => {
    const loadHalls = async () => {
      try {
        setIsLoading(true); // حالت بارگذاری روشن می‌شود
        const storedHalls = localStorage.getItem('halls');
        if (storedHalls) {
          setHalls(JSON.parse(storedHalls)); // اگر سالن‌ها در localStorage باشند، بارگذاری می‌شود
        } else {
          // اگر در localStorage موجود نبود، سالن‌ها را از API بارگذاری می‌کنیم
          const fetchedHalls = await fetchHalls();
          setHalls(fetchedHalls);
          localStorage.setItem('halls', JSON.stringify(fetchedHalls)); // ذخیره‌سازی سالن‌ها در localStorage
        }
      } catch (error) {
        console.error('Failed to load halls:', error);
        message.error('Failed to load halls!');
      } finally {
        setIsLoading(false); // حالت بارگذاری خاموش می‌شود
      }
    };

    loadHalls();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values: any) => {
    try {
      setIsLoading(true);
      const newHall = await createHall(values); // ارسال سالن جدید به API
      const updatedHalls = [...halls, newHall];
      setHalls(updatedHalls); // اضافه کردن سالن جدید به لیست سالن‌ها
      localStorage.setItem('halls', JSON.stringify(updatedHalls)); // ذخیره‌سازی سالن‌ها در localStorage
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to create hall:', error);
      message.error('Failed to create hall!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (hallId: string) => {
    setIsLoading(true); // فعال‌سازی حالت بارگذاری
    try {
      await deleteHall(hallId); // ارسال درخواست حذف سالن
      const updatedHalls = halls.filter(hall => hall.id !== hallId); // حذف سالن از لیست
      setHalls(updatedHalls); // به‌روزرسانی لیست سالن‌ها
      localStorage.setItem('halls', JSON.stringify(updatedHalls)); // ذخیره‌سازی جدید در localStorage
      message.success('Hall deleted successfully!');
    } catch (error) {
      console.error('Error deleting hall:', error);
      message.error('Failed to delete hall!');
    } finally {
      setIsLoading(false); // خاموش کردن حالت بارگذاری
    }
  };

  return (
    <div className="halls-container">
      <h2>My Halls</h2>

      {/* دکمه اضافه کردن سالن */}
      <div className="card-box" onClick={showModal}>
        <div className="add-icon">+</div>
      </div>

      {/* مدال برای اضافه کردن سالن */}
      <Modal 
        title="Add Hall" 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer={null}
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          <Form.Item 
            name="hallName" 
            label="Hall Name" 
            rules={[{ required: true, message: 'Please input the hall name!' }]}
          >
            <Input placeholder="Enter hall name" />
          </Form.Item>
          
          <Form.Item 
            name="importerName" 
            label="Importer Name" 
            rules={[{ required: true, message: 'Please input the importer name!' }]}
          >
            <Input placeholder="Enter importer name" />
          </Form.Item>
          
          <Form.Item 
            name="chickenCount" 
            label="Number of Chickens" 
            rules={[{ required: true, message: 'Please input the number of chickens!' }]}
          >
            <Input type="number" min={1} placeholder="Enter chicken count" />
          </Form.Item>
          
          <Form.Item 
            name="chickenType" 
            label="Type of Chickens" 
            rules={[{ required: true, message: 'Please select the type of chickens!' }]}
          >
            <Select placeholder="Select chicken type">
              <Option value="broiler">Broiler</Option>
              <Option value="layer">Layer</Option>
              <Option value="free-range">Free-range</Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            name="initialWeight" 
            label="Initial Weight (kg)" 
            rules={[{ required: true, message: 'Please input the initial weight!' }]}
          >
            <Input type="number" min={0.1} step="0.1" placeholder="Enter initial weight" />
          </Form.Item>
          
          <Form.Item 
            name="budgetType" 
            label="Budget Type" 
            rules={[{ required: true, message: 'Please select the budget type!' }]}
          >
            <Select placeholder="Select budget type">
              <Option value="standard">Standard</Option>
              <Option value="premium">Premium</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Hall
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* لیست سالن‌ها */}
      <div className="halls-list">
        {isLoading && <div>Loading...</div>}
        {halls.map((hall) => (
          <div key={hall.id} className="hall-item">
            <h3>{hall.hallName}</h3>
            <p>Importer: {hall.importerName}</p>
            <p>Number of Chickens: {hall.chickenCount}</p>
            <p>Type of Chickens: {hall.chickenType}</p>
            <p>Initial Weight: {hall.initialWeight} kg</p>
            <Button 
              onClick={() => navigate(`/dashboard/halls/${hall.id}`, { state: { budgetType: hall.budgetType } })}
            >
              View Details
            </Button>
            <Button 
              onClick={() => handleDelete(hall.id)} 
              type="primary" 
              style={{ marginLeft: '10px' }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Halls;
