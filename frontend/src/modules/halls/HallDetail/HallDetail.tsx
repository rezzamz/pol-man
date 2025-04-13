import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'chart.js/auto';
import './HallDetail.css';

interface DailyData {
  day: number;
  feedConsumption: number;
  waterConsumption: number;
  averageWeight: number;
  mortality: number;
}

interface RossStandardData {
  day: number;
  weightKg: number;
  feedConsumption: number;
  waterConsumption: number;
  mortality: number;
}

const HallDetail: React.FC = () => {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [rossStandardData, setRossStandardData] = useState<RossStandardData[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Initialize daily data
    setDailyData([
      
        { day: 1, feedConsumption: 1.2, waterConsumption: 2.5, averageWeight: 0.5, mortality: 2 },
        { day: 2, feedConsumption: 1.5, waterConsumption: 3.0, averageWeight: 0.7, mortality: 1 },
        { day: 3, feedConsumption: 1.8, waterConsumption: 3.5, averageWeight: 0.9, mortality: 1 },
        { day: 4, feedConsumption: 2.0, waterConsumption: 4.0, averageWeight: 1.1, mortality: 0 },
        { day: 5, feedConsumption: 2.3, waterConsumption: 4.5, averageWeight: 1.3, mortality: 1 },
        { day: 6, feedConsumption: 2.6, waterConsumption: 5.0, averageWeight: 1.5, mortality: 0 },
        { day: 7, feedConsumption: 2.9, waterConsumption: 5.5, averageWeight: 1.7, mortality: 1 },
        { day: 8, feedConsumption: 3.2, waterConsumption: 6.0, averageWeight: 1.9, mortality: 0 },
        { day: 9, feedConsumption: 3.5, waterConsumption: 6.5, averageWeight: 2.1, mortality: 0 },
        { day: 10, feedConsumption: 3.8, waterConsumption: 7.0, averageWeight: 2.3, mortality: 1 },
        { day: 11, feedConsumption: 4.1, waterConsumption: 7.5, averageWeight: 2.5, mortality: 0 },
        { day: 12, feedConsumption: 4.4, waterConsumption: 8.0, averageWeight: 2.7, mortality: 0 },
        { day: 13, feedConsumption: 4.7, waterConsumption: 8.5, averageWeight: 2.9, mortality: 1 },
        { day: 14, feedConsumption: 5.0, waterConsumption: 9.0, averageWeight: 3.1, mortality: 0 },
        { day: 15, feedConsumption: 5.3, waterConsumption: 9.5, averageWeight: 3.3, mortality: 0 },
        { day: 16, feedConsumption: 5.6, waterConsumption: 10.0, averageWeight: 3.5, mortality: 0 },
        { day: 17, feedConsumption: 5.9, waterConsumption: 10.5, averageWeight: 3.7, mortality: 1 },
        { day: 18, feedConsumption: 6.2, waterConsumption: 11.0, averageWeight: 3.9, mortality: 0 },
        { day: 19, feedConsumption: 6.5, waterConsumption: 11.5, averageWeight: 4.1, mortality: 0 },
        { day: 20, feedConsumption: 6.8, waterConsumption: 12.0, averageWeight: 4.3, mortality: 0 },
        { day: 21, feedConsumption: 7.1, waterConsumption: 12.5, averageWeight: 4.5, mortality: 0 },
        { day: 22, feedConsumption: 7.4, waterConsumption: 13.0, averageWeight: 4.7, mortality: 0 },
        { day: 23, feedConsumption: 7.7, waterConsumption: 13.5, averageWeight: 4.9, mortality: 0 },
        { day: 24, feedConsumption: 8.0, waterConsumption: 14.0, averageWeight: 5.1, mortality: 0 },
        { day: 25, feedConsumption: 8.3, waterConsumption: 14.5, averageWeight: 5.3, mortality: 0 },
        { day: 26, feedConsumption: 8.6, waterConsumption: 15.0, averageWeight: 5.5, mortality: 0 },
        { day: 27, feedConsumption: 8.9, waterConsumption: 15.5, averageWeight: 5.7, mortality: 0 },
        { day: 28, feedConsumption: 9.2, waterConsumption: 16.0, averageWeight: 5.9, mortality: 0 },
        { day: 29, feedConsumption: 9.5, waterConsumption: 16.5, averageWeight: 6.1, mortality: 0 },
        { day: 30, feedConsumption: 9.8, waterConsumption: 17.0, averageWeight: 6.3, mortality: 0 },
        { day: 31, feedConsumption: 10.1, waterConsumption: 17.5, averageWeight: 6.5, mortality: 0 },
        { day: 32, feedConsumption: 10.4, waterConsumption: 18.0, averageWeight: 6.7, mortality: 0 },
        { day: 33, feedConsumption: 10.7, waterConsumption: 18.5, averageWeight: 6.9, mortality: 0 },
        { day: 34, feedConsumption: 11.0, waterConsumption: 19.0, averageWeight: 7.1, mortality: 0 },
        { day: 35, feedConsumption: 11.3, waterConsumption: 19.5, averageWeight: 7.3, mortality: 0 },
        { day: 36, feedConsumption: 11.6, waterConsumption: 20.0, averageWeight: 7.5, mortality: 0 },
        { day: 37, feedConsumption: 11.9, waterConsumption: 20.5, averageWeight: 7.7, mortality: 0 },
        { day: 38, feedConsumption: 12.2, waterConsumption: 21.0, averageWeight: 7.9, mortality: 0 },
        { day: 39, feedConsumption: 12.5, waterConsumption: 21.5, averageWeight: 8.1, mortality: 0 },
        { day: 40, feedConsumption: 12.8, waterConsumption: 22.0, averageWeight: 8.3, mortality: 0 },
        { day: 41, feedConsumption: 13.1, waterConsumption: 22.5, averageWeight: 8.5, mortality: 0 },
        { day: 42, feedConsumption: 13.4, waterConsumption: 23.0, averageWeight: 8.7, mortality: 0 },
        { day: 43, feedConsumption: 13.7, waterConsumption: 23.5, averageWeight: 8.9, mortality: 0 },
        { day: 44, feedConsumption: 14.0, waterConsumption: 24.0, averageWeight: 9.1, mortality: 0 },
        { day: 45, feedConsumption: 14.3, waterConsumption: 24.5, averageWeight: 9.3, mortality: 0 },
        { day: 46, feedConsumption: 14.6, waterConsumption: 25.0, averageWeight: 9.5, mortality: 0 },
        { day: 47, feedConsumption: 14.9, waterConsumption: 25.5, averageWeight: 9.7, mortality: 0 },
        { day: 48, feedConsumption: 15.2, waterConsumption: 26.0, averageWeight: 9.9, mortality: 0 },
        { day: 49, feedConsumption: 15.5, waterConsumption: 26.5, averageWeight: 10.1, mortality: 0 },
        { day: 50, feedConsumption: 15.8, waterConsumption: 27.0, averageWeight: 10.3, mortality: 0 },
        { day: 51, feedConsumption: 16.1, waterConsumption: 27.5, averageWeight: 10.5, mortality: 0 },
        { day: 52, feedConsumption: 16.4, waterConsumption: 28.0, averageWeight: 10.7, mortality: 0 },
        { day: 53, feedConsumption: 16.7, waterConsumption: 28.5, averageWeight: 10.9, mortality: 0 },
        { day: 54, feedConsumption: 17.0, waterConsumption: 29.0, averageWeight: 11.1, mortality: 0 },
        { day: 55, feedConsumption: 17.3, waterConsumption: 29.5, averageWeight: 11.3, mortality: 0 },
        { day: 56, feedConsumption: 17.6, waterConsumption: 30.0, averageWeight: 11.5, mortality: 0 }
      
      // Add more days here
    ]);
    setRossStandardData([
      
        { day: 1, weightKg: 0.5, feedConsumption: 1.2, waterConsumption: 2.5, mortality: 2 },
        { day: 2, weightKg: 0.7, feedConsumption: 1.5, waterConsumption: 3.0, mortality: 1 },
        { day: 3, weightKg: 0.9, feedConsumption: 1.8, waterConsumption: 3.5, mortality: 1 },
        { day: 4, weightKg: 1.1, feedConsumption: 2.0, waterConsumption: 4.0, mortality: 0 },
        { day: 5, weightKg: 1.3, feedConsumption: 2.3, waterConsumption: 4.5, mortality: 1 },
        { day: 6, weightKg: 1.5, feedConsumption: 2.6, waterConsumption: 5.0, mortality: 0 },
        { day: 7, weightKg: 1.7, feedConsumption: 2.9, waterConsumption: 5.5, mortality: 1 },
        { day: 8, weightKg: 1.9, feedConsumption: 3.2, waterConsumption: 6.0, mortality: 0 },
        { day: 9, weightKg: 2.1, feedConsumption: 3.5, waterConsumption: 6.5, mortality: 0 },
        { day: 10, weightKg: 2.3, feedConsumption: 3.8, waterConsumption: 7.0, mortality: 1 },
        { day: 11, weightKg: 2.5, feedConsumption: 4.1, waterConsumption: 7.5, mortality: 0 },
        { day: 12, weightKg: 2.7, feedConsumption: 4.4, waterConsumption: 8.0, mortality: 0 },
        { day: 13, weightKg: 2.9, feedConsumption: 4.7, waterConsumption: 8.5, mortality: 1 },
        { day: 14, weightKg: 3.1, feedConsumption: 5.0, waterConsumption: 9.0, mortality: 0 },
        { day: 15, weightKg: 3.3, feedConsumption: 5.3, waterConsumption: 9.5, mortality: 0 },
        { day: 16, weightKg: 3.5, feedConsumption: 5.6, waterConsumption: 10.0, mortality: 0 },
        { day: 17, weightKg: 3.7, feedConsumption: 5.9, waterConsumption: 10.5, mortality: 1 },
        { day: 18, weightKg: 3.9, feedConsumption: 6.2, waterConsumption: 11.0, mortality: 0 },
        { day: 19, weightKg: 4.1, feedConsumption: 6.5, waterConsumption: 11.5, mortality: 0 },
        { day: 20, weightKg: 4.3, feedConsumption: 6.8, waterConsumption: 12.0, mortality: 0 },
        { day: 21, weightKg: 4.5, feedConsumption: 7.1, waterConsumption: 12.5, mortality: 0 },
        { day: 22, weightKg: 4.7, feedConsumption: 7.4, waterConsumption: 13.0, mortality: 0 },
        { day: 23, weightKg: 4.9, feedConsumption: 7.7, waterConsumption: 13.5, mortality: 0 },
        { day: 24, weightKg: 5.1, feedConsumption: 8.0, waterConsumption: 14.0, mortality: 0 },
        { day: 25, weightKg: 5.3, feedConsumption: 8.3, waterConsumption: 14.5, mortality: 0 },
        { day: 26, weightKg: 5.5, feedConsumption: 8.6, waterConsumption: 15.0, mortality: 0 },
        { day: 27, weightKg: 5.7, feedConsumption: 8.9, waterConsumption: 15.5, mortality: 0 },
        { day: 28, weightKg: 5.9, feedConsumption: 9.2, waterConsumption: 16.0, mortality: 0 },
        { day: 29, weightKg: 6.1, feedConsumption: 9.5, waterConsumption: 16.5, mortality: 0 },
        { day: 30, weightKg: 6.3, feedConsumption: 9.8, waterConsumption: 17.0, mortality: 0 },
        { day: 31, weightKg: 6.5, feedConsumption: 10.1, waterConsumption: 17.5, mortality: 0 },
        { day: 32, weightKg: 6.7, feedConsumption: 10.4, waterConsumption: 18.0, mortality: 0 },
        { day: 33, weightKg: 6.9, feedConsumption: 10.7, waterConsumption: 18.5, mortality: 0 },
        { day: 34, weightKg: 7.1, feedConsumption: 11.0, waterConsumption: 19.0, mortality: 0 },
        { day: 35, weightKg: 7.3, feedConsumption: 11.3, waterConsumption: 19.5, mortality: 0 },
        { day: 36, weightKg: 7.5, feedConsumption: 11.6, waterConsumption: 20.0, mortality: 0 },
        { day: 37, weightKg: 7.7, feedConsumption: 11.9, waterConsumption: 20.5, mortality: 0 },
        { day: 38, weightKg: 7.9, feedConsumption: 12.2, waterConsumption: 21.0, mortality: 0 },
        { day: 39, weightKg: 8.1, feedConsumption: 12.5, waterConsumption: 21.5, mortality: 0 },
        { day: 40, weightKg: 8.3, feedConsumption: 12.8, waterConsumption: 22.0, mortality: 0 },
        { day: 41, weightKg: 8.5, feedConsumption: 13.1, waterConsumption: 22.5, mortality: 0 },
        { day: 42, weightKg: 8.7, feedConsumption: 13.4, waterConsumption: 23.0, mortality: 0 },
        { day: 43, weightKg: 8.9, feedConsumption: 13.7, waterConsumption: 23.5, mortality: 0 },
        { day: 44, weightKg: 9.1, feedConsumption: 14.0, waterConsumption: 24.0, mortality: 0 },
        { day: 45, weightKg: 9.3, feedConsumption: 14.3, waterConsumption: 24.5, mortality: 0 },
        { day: 46, weightKg: 9.5, feedConsumption: 14.6, waterConsumption: 25.0, mortality: 0 },
        { day: 47, weightKg: 9.7, feedConsumption: 14.9, waterConsumption: 25.5, mortality: 0 },
        { day: 48, weightKg: 9.9, feedConsumption: 15.2, waterConsumption: 26.0, mortality: 0 },
        { day: 49, weightKg: 10.1, feedConsumption: 15.5, waterConsumption: 26.5, mortality: 0 },
        { day: 50, weightKg: 10.3, feedConsumption: 15.8, waterConsumption: 27.0, mortality: 0 },
        { day: 51, weightKg: 10.5, feedConsumption: 16.1, waterConsumption: 27.5, mortality: 0 },
        { day: 52, weightKg: 10.7, feedConsumption: 16.4, waterConsumption: 28.0, mortality: 0 },
        { day: 53, weightKg: 10.9, feedConsumption: 16.7, waterConsumption: 28.5, mortality: 0 },
        { day: 54, weightKg: 11.1, feedConsumption: 17.0, waterConsumption: 29.0, mortality: 0 },
        { day: 55, weightKg: 11.3, feedConsumption: 17.3, waterConsumption: 29.5, mortality: 0 },
        { day: 56, weightKg: 11.5, feedConsumption: 17.6, waterConsumption: 30.0, mortality: 0 }
      
    ]);
  }, []);

  const handleDailySubmit = (values: any) => {
    // Update daily data for the current day
    setDailyData((prevData) =>
      prevData.map((data) =>
        data.day === currentDay ? { ...data, ...values } : data
      )
    );

    // Move to the next day if it's not the last day
    if (currentDay < dailyData.length) {
      setCurrentDay(currentDay + 1);
    } else {
      console.log('You are on the last day!');
    }
  };

  const goToPreviousDay = () => setCurrentDay((prevDay) => Math.max(prevDay - 1, 1));
  const goToNextDay = () => setCurrentDay((prevDay) => Math.min(prevDay + 1, dailyData.length));
  const goToAdminPanel = () => {
    // Navigate to the specified URL
    window.location.href = 'http://localhost:3000/dashboard/halls';
  };

  // Chart configurations
  const createComparisonChartData = (label: string, userValues: number[], standardValues: number[], color1: string, color2: string) => ({
    labels: dailyData.map((data) => `Day ${data.day}`),
    datasets: [
      {
        label: `${label} (Your Data)`,
        data: userValues,
        borderColor: color1,
        backgroundColor: `${color1}33`, // 20% opacity
        fill: false,
        tension: 0.1,
      },
      {
        label: `${label} (Standard)`,
        data: standardValues,
        borderColor: color2,
        backgroundColor: `${color2}33`, // 20% opacity
        fill: false,
        tension: 0.1,
      },
    ],
  });

  const feedConsumptionChartData = createComparisonChartData(
    'Feed Consumption (kg)',
    dailyData.map((data) => data.feedConsumption),
    rossStandardData.map((data) => data.feedConsumption),
    'rgba(75,192,192,1)',
    'rgba(255,99,132,1)'
  );

  const waterConsumptionChartData = createComparisonChartData(
    'Water Consumption (liters)',
    dailyData.map((data) => data.waterConsumption),
    rossStandardData.map((data) => data.waterConsumption),
    'rgba(54,162,235,1)',
    'rgba(255,206,86,1)'
  );

  const averageWeightChartData = createComparisonChartData(
    'Average Weight (kg)',
    dailyData.map((data) => data.averageWeight),
    rossStandardData.map((data) => data.weightKg),
    'rgba(255,206,86,1)',
    'rgba(153,102,255,1)'
  );

  const mortalityChartData = createComparisonChartData(
    'Mortality',
    dailyData.map((data) => data.mortality),
    rossStandardData.map((data) => data.mortality),
    'rgba(255,159,64,1)',
    'rgba(54,162,235,1)'
  );

  return (
    <div className="hall-detail-container">
      <div className="top-bar">
        <Button onClick={goToAdminPanel} type="default">
          Go to Admin Panel
        </Button>
      </div>

      <h2>Hall Details for Day {currentDay}</h2>
      <div className="day-navigation">
        <Button onClick={goToPreviousDay} disabled={currentDay === 1}>
          Previous Day
        </Button>
        <span>Day {currentDay}</span>
        <Button onClick={goToNextDay} disabled={currentDay === dailyData.length}>
          Next Day
        </Button>
      </div>

      <div className="charts-container">
        <div className="chart-item">
          <h3>Feed Consumption</h3>
          <Line data={feedConsumptionChartData} />
        </div>
        <div className="chart-item">
          <h3>Water Consumption</h3>
          <Line data={waterConsumptionChartData} />
        </div>
        <div className="chart-item">
          <h3>Average Weight</h3>
          <Line data={averageWeightChartData} />
        </div>
        <div className="chart-item">
          <h3>Mortality</h3>
          <Line data={mortalityChartData} />
        </div>
      </div>

      <Form onFinish={handleDailySubmit} initialValues={dailyData[currentDay - 1]} layout="vertical">
        <Form.Item label="Feed Consumption (kg)" name="feedConsumption" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Water Consumption (liters)" name="waterConsumption" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Average Weight (kg)" name="averageWeight" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Mortality" name="mortality" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="comparison-table">
        <h3>Daily Comparison</h3>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Your Feed (kg)</th>
              <th>Standard Feed (kg)</th>
              <th>Your Water (L)</th>
              <th>Standard Water (L)</th>
              <th>Your Weight (kg)</th>
              <th>Standard Weight (kg)</th>
              <th>Your Mortality</th>
              <th>Standard Mortality</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.map((data, index) => {
              const standard = rossStandardData.find((s) => s.day === data.day);
              return (
                <tr key={index}>
                  <td>{data.day}</td>
                  <td>{data.feedConsumption}</td>
                  <td>{standard?.feedConsumption ?? '-'}</td>
                  <td>{data.waterConsumption}</td>
                  <td>{standard?.waterConsumption ?? '-'}</td>
                  <td>{data.averageWeight}</td>
                  <td>{standard?.weightKg ?? '-'}</td>
                  <td>{data.mortality}</td>
                  <td>{standard?.mortality ?? '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default HallDetail;