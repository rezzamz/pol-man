import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './HallDetail.css';
import { fetchHallDetail, updateHallDetail } from '../../services/api';

interface DailyData {
  day: number;
  feedConsumption: number;
  waterConsumption: number;
  averageWeight: number;
  mortality: number;
}

interface RossStandardData {
  day: number;
  weightGram: number;
  weightKg: number;
  dailyWeightGainGram: number;
  avgDailyWeightGainGram: number;
  feedConsumptionGram: number;
  cumulativeFeedGram: number;
  cumulativeFeedKg: number;
  feedConversionRatio: number;
  waterConsumptionLiter: number;
  mortalityCount: number;
}

const rossStandardData: RossStandardData[] = [
  // ... existing data
];

const premiumStandardData: RossStandardData[] = [
  // ... premium data
];

const HallDetail: React.FC = () => {
  const { hallId } = useParams<{ hallId: string }>();
  const location = useLocation();
  const { budgetType } = (location.state as any) || { budgetType: 'standard' };
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [standardData, setStandardData] = useState<RossStandardData[]>(rossStandardData);

  useEffect(() => {
    const fetchData = async () => {
      if (hallId) {
        const response = await fetchHallDetail(hallId);
        if (response) {
          setDailyData(response.dailyData);
        }
      }
    };
    fetchData();
  }, [hallId]);

  useEffect(() => {
    if (budgetType === 'premium') {
      setStandardData(premiumStandardData);
    } else {
      setStandardData(rossStandardData);
    }
  }, [budgetType]);

  const handleDailySubmit = async (values: DailyData) => {
    const updatedDailyData = [...dailyData.filter(data => data.day !== currentDay), { ...values, day: currentDay }];
    setDailyData(updatedDailyData);
    if (hallId) {
      await updateHallDetail(hallId, updatedDailyData);
    }
  };

  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDay < 56) {
      setCurrentDay(currentDay + 1);
    }
  };

  const getDailyDataForDay = (day: number): DailyData => {
    return dailyData.find(data => data.day === day) || { day, feedConsumption: 0, waterConsumption: 0, averageWeight: 0, mortality: 0 };
  };

  const calculateCumulativeFeed = (day: number): number => {
    const cumulativeFeed = dailyData.filter(data => data.day <= day).reduce((acc, data) => acc + data.feedConsumption, 0);
    return Number(cumulativeFeed);
  };

  const calculateFeedConversionRatio = (day: number): number => {
    const cumulativeFeed = calculateCumulativeFeed(day);
    const cumulativeWeight = dailyData.filter(data => data.day <= day).reduce((acc, data) => acc + data.averageWeight * (1000 - data.mortality), 0);
    return cumulativeWeight / cumulativeFeed;
  };

  const dailyDataForCurrentDay = getDailyDataForDay(currentDay);
  const standardDataForCurrentDay = standardData.find(data => data.day === currentDay) || {} as RossStandardData;

  return (
    <div className="hall-detail-container">
      <h2>Hall Details for Hall {hallId}</h2>
      <div className="day-navigation">
        {/* ... existing code for day navigation and other UI elements */}
      </div>
      <Form onFinish={handleDailySubmit} initialValues={dailyDataForCurrentDay}>
        <Form.Item name="feedConsumption" label="Feed Consumption">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="waterConsumption" label="Water Consumption">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="averageWeight" label="Average Weight">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="mortality" label="Mortality">
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default HallDetail;