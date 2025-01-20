import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
} from '@mui/material'; 
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchPredictiveData, fetchRealTimeInsights } from '../services/api';
import SalesPrediction from '../components/SalesPrediction';
import DemandForecasting from '../components/DemandForecasting';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [predictiveData, setPredictiveData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [predData, insightData] = await Promise.all([
          fetchPredictiveData(),
          fetchRealTimeInsights(),
        ]);
        setPredictiveData(predData);
        setInsights(insightData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Demand Forecasting Section */}
        <Grid item xs={12}>
          <DemandForecasting />
        </Grid>

        {/* Sales Prediction Section */}
        <Grid item xs={12}>
          <SalesPrediction />
        </Grid>

        {/* Predictive Analytics Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Predictive Analytics
            </Typography>
            {predictiveData && (
              <Line
                data={{
                  labels: predictiveData.labels,
                  datasets: [
                    {
                      label: 'Supply Chain Demand',
                      data: predictiveData.data,
                      fill: false,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Supply Chain Predictive Analytics',
                    },
                  },
                }}
              />
            )}
          </Paper>
        </Grid>

        {/* Real-time Insights */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Real-time Insights
            </Typography>
            <List>
              {insights.map((insight, index) => (
                <ListItem key={index}>
                  <ListItemText primary={insight} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Blockchain Features */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Blockchain Features
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Immutable Record Keeping
              </Typography>
              <Typography variant="body2" paragraph>
                All supply chain transactions are permanently recorded and cannot be altered.
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Transparency
              </Typography>
              <Typography variant="body2" paragraph>
                Complete visibility of supply chain operations for all authorized participants.
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Smart Contracts
              </Typography>
              <Typography variant="body2" paragraph>
                Automated execution of supply chain agreements and transactions.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 