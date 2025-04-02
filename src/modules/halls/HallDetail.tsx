import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { Line } from 'react-chartjs-2';
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
  {
    day: 0,
    weightGram: 44,
    weightKg: 0.044,
    dailyWeightGainGram: 0,
    avgDailyWeightGainGram: 0,
    feedConsumptionGram: 0,
    cumulativeFeedGram: 0,
    cumulativeFeedKg: 0,
    feedConversionRatio: 0,
    waterConsumptionLiter: 0.3,
    mortalityCount: 0
  },
  {
    day: 1,
    weightGram: 62,
    weightKg: 0.062,
    dailyWeightGainGram: 18,
    avgDailyWeightGainGram: 18,
    feedConsumptionGram: 12.2,
    cumulativeFeedGram: 12.2,
    cumulativeFeedKg: 0.0122,
    feedConversionRatio: 0.197,
    waterConsumptionLiter: 0.5,
    mortalityCount: 1
  },
  {
    day: 2,
    weightGram: 81,
    weightKg: 0.081,
    dailyWeightGainGram: 19,
    avgDailyWeightGainGram: 18.5,
    feedConsumptionGram: 16.3,
    cumulativeFeedGram: 28.5,
    cumulativeFeedKg: 0.0285,
    feedConversionRatio: 0.352,
    waterConsumptionLiter: 0.5,
    mortalityCount: 1
  },
  // روزهای 3 تا 54 به همین صورت...
  {
    day: 55,
    weightGram: 4230,
    weightKg: 4.23,
    dailyWeightGainGram: 88,
    avgDailyWeightGainGram: 76,
    feedConsumptionGram: 233,
    cumulativeFeedGram: 7496.5,
    cumulativeFeedKg: 7.4965,
    feedConversionRatio: 1.772,
    waterConsumptionLiter: 1.8,
    mortalityCount: 2
  },
  {
    day: 56,
    weightGram: 4318,
    weightKg: 4.318,
    dailyWeightGainGram: 88,
    avgDailyWeightGainGram: 76,
    feedConsumptionGram: 234,
    cumulativeFeedGram: 7730.5,
    cumulativeFeedKg: 7.7305,
    feedConversionRatio: 1.790,
    waterConsumptionLiter: 1.8,
    mortalityCount: 2
  }
];

const HallDetail: React.FC = () => {
  const { hallId } = useParams<{ hallId: string }>();
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [currentDay, setCurrentDay] = useState(1);

  const handleDailySubmit = (values: DailyData) => {
    const updatedDailyData = [...dailyData.filter(data => data.day !== currentDay), { ...values, day: currentDay }];
    setDailyData(updatedDailyData);
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
  const standardDataForCurrentDay = rossStandardData.find(data => data.day === currentDay) || {} as RossStandardData;

  return (
    <div>
      <h2>Hall Details for Hall {hallId}</h2>
      <div className="day-navigation">
        <Button onClick={goToPreviousDay} disabled={currentDay === 1}>Previous Day</Button>
        <span>Day {currentDay}</span>
        <Button onClick={goToNextDay} disabled={currentDay === 56}>Next Day</Button>
      </div>
      <Form onFinish={handleDailySubmit} initialValues={dailyDataForCurrentDay}>
        <Form.Item label="Feed Consumption (kg)" name="feedConsumption" rules={[{ required: true, message: 'Please input the feed consumption!' }]}>
          <Input type="number" addonAfter={`Standard: ${(standardDataForCurrentDay.feedConsumptionGram || 0) / 1000} kg`} />
        </Form.Item>
        <Form.Item label="Water Consumption (liters)" name="waterConsumption" rules={[{ required: true, message: 'Please input the water consumption!' }]}>
          <Input type="number" addonAfter={`Standard: ${standardDataForCurrentDay.waterConsumptionLiter || 'N/A'} liters`} />
        </Form.Item>
        <Form.Item label="Average Weight (kg)" name="averageWeight" rules={[{ required: true, message: 'Please input the average weight!' }]}>
          <Input type="number" addonAfter={`Standard: ${standardDataForCurrentDay.weightKg || 'N/A'} kg`} />
        </Form.Item>
        <Form.Item label="Mortality" name="mortality" rules={[{ required: true, message: 'Please input the mortality!' }]}>
          <Input type="number" addonAfter={`Standard: ${standardDataForCurrentDay.mortalityCount || 'N/A'}`} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      <div className="calculated-fields">
        <h4>Calculated Fields for Day {currentDay}</h4>
        <p>Cumulative Feed Consumption (kg): {calculateCumulativeFeed(currentDay).toFixed(2)}</p>
        <p>Feed Conversion Ratio: {calculateFeedConversionRatio(currentDay).toFixed(2)}</p>
      </div>
      <div className="charts">
        <h4>Feed Consumption (kg)</h4>
        <Line
          data={{
            labels: dailyData.map(data => `Day ${data.day}`),
            datasets: [
              {
                label: 'Feed Consumption (kg)',
                data: dailyData.map(data => data.feedConsumption),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
              },
              {
                label: 'Standard Feed Consumption (kg)',
                data: rossStandardData.map(data => data.feedConsumptionGram / 1000),
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
              }
            ],
          }}
        />
        <h4>Water Consumption (liters)</h4>
        <Line
          data={{
            labels: dailyData.map(data => `Day ${data.day}`),
            datasets: [
              {
                label: 'Water Consumption (liters)',
                data: dailyData.map(data => data.waterConsumption),
                borderColor: 'rgba(54,162,235,1)',
                fill: false,
              },
              {
                label: 'Standard Water Consumption (liters)',
                data: rossStandardData.map(data => data.waterConsumptionLiter),
                borderColor: 'rgba(255,206,86,1)',
                fill: false,
              }
            ],
          }}
        />
        <h4>Average Weight (kg)</h4>
        <Line
          data={{
            labels: dailyData.map(data => `Day ${data.day}`),
            datasets: [
              {
                label: 'Average Weight (kg)',
                data: dailyData.map(data => data.averageWeight),
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
              },
              {
                label: 'Standard Average Weight (kg)',
                data: rossStandardData.map(data => data.weightKg),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
              }
            ],
          }}
        />
        <h4>Mortality</h4>
        <Line
          data={{
            labels: dailyData.map(data => `Day ${data.day}`),
            datasets: [
              {
                label: 'Mortality',
                data: dailyData.map(data => data.mortality),
                borderColor: 'rgba(153,102,255,1)',
                fill: false,
              },
              {
                label: 'Standard Mortality',
                data: rossStandardData.map(data => data.mortalityCount),
                borderColor: 'rgba(255,159,64,1)',
                fill: false,
              }
            ],
          }}
        />
      </div>
    </div>
  );
};

export default HallDetail;