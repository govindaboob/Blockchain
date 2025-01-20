import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { fetchDemandForecast } from '../services/api';

function DemandForecasting() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleForecast = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    try {
      const result = await fetchDemandForecast(selectedProduct);
      setForecast(result);
    } catch (error) {
      console.error('Error forecasting demand:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: forecast?.nextThreeMonths.map(f => f.month) || [],
    datasets: [
      {
        label: 'Predicted Demand',
        data: forecast?.nextThreeMonths.map(f => f.predictedDemand) || [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Demand Forecast - Next 3 Months',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Demand Forecasting
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Product Name"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleForecast}
          disabled={!selectedProduct || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <TimelineIcon />}
        >
          Generate Forecast
        </Button>
      </Box>

      {forecast && (
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Line data={chartData} options={chartOptions} />
              </CardContent>
            </Card>
          </Grid>

          {/* Forecast Details */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Predictions
                </Typography>
                {forecast.nextThreeMonths.map((month, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">
                      {month.month}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={`Demand: ${month.predictedDemand} units`}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label={`Confidence: ${month.confidence}%`}
                        color="secondary"
                        size="small"
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Influencing Factors */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Influencing Factors
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={forecast.seasonalTrend === 'increasing' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={`Seasonal Trend: ${forecast.seasonalTrend}`}
                    color={forecast.seasonalTrend === 'increasing' ? 'success' : 'error'}
                    sx={{ mb: 2 }}
                  />
                </Box>
                <List>
                  {forecast.factors.map((factor, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={factor} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default DemandForecasting; 