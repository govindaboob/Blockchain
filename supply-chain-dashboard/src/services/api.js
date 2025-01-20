import axios from 'axios';

// Mock API data and functions
const mockPredictiveData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [65, 59, 80, 81, 56, 55],
};

const mockInsights = [
  'Shipment #1234 delayed by 2 hours',
  'New supplier onboarded successfully',
  'Smart contract executed for order #5678',
  'Inventory levels optimal',
];

const mockSalesData = [
  {
    id: 1,
    productName: "Laptop Pro X",
    orderDate: "2024-01-15",
    sales: 1500,
    orderCity: "New York",
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    id: 2,
    productName: "Smartphone Y",
    orderDate: "2024-01-15",
    sales: 800,
    orderCity: "Los Angeles",
    latitude: 34.0522,
    longitude: -118.2437
  },
  {
    id: 3,
    productName: "Tablet Z",
    orderDate: "2024-01-16",
    sales: 600,
    orderCity: "Chicago",
    latitude: 41.8781,
    longitude: -87.6298
  },
  // Add more mock data as needed
];

export const fetchPredictiveData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPredictiveData), 1000);
  });
};

export const fetchRealTimeInsights = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInsights), 1000);
  });
};

export const fetchSalesData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSalesData), 1000);
  });
};

export const predictSales = (productName) => {
  // Mock prediction algorithm
  const prediction = {
    nextMonthSales: Math.floor(Math.random() * 2000) + 500,
    confidence: Math.floor(Math.random() * 30) + 70,
    trend: 'increasing',
  };
  return new Promise((resolve) => {
    setTimeout(() => resolve(prediction), 1000);
  });
};

export const fetchDemandForecast = (productName, historicalData) => {
  // Mock forecasting algorithm
  const forecast = {
    nextThreeMonths: [
      {
        month: getNextMonth(1),
        predictedDemand: Math.floor(Math.random() * 1000) + 500,
        confidence: Math.floor(Math.random() * 20) + 80,
      },
      {
        month: getNextMonth(2),
        predictedDemand: Math.floor(Math.random() * 1000) + 500,
        confidence: Math.floor(Math.random() * 20) + 80,
      },
      {
        month: getNextMonth(3),
        predictedDemand: Math.floor(Math.random() * 1000) + 500,
        confidence: Math.floor(Math.random() * 20) + 80,
      },
    ],
    seasonalTrend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
    factors: [
      'Historical sales patterns',
      'Seasonal variations',
      'Market trends',
      'Economic indicators',
    ],
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(forecast), 1000);
  });
};

// Helper function to get next months
function getNextMonth(addMonths) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + addMonths));
  return months[nextMonth.getMonth()];
} 