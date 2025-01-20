import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { fetchSalesData, predictSales } from '../services/api';

function SalesPrediction() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        const data = await fetchSalesData();
        setSalesData(data);
      } catch (error) {
        console.error('Error loading sales data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSalesData();
  }, []);

  const handlePredict = async () => {
    if (!selectedProduct) return;
    
    setPredicting(true);
    try {
      const result = await predictSales(selectedProduct);
      setPrediction(result);
    } catch (error) {
      console.error('Error predicting sales:', error);
    } finally {
      setPredicting(false);
    }
  };

  const uniqueProducts = [...new Set(salesData.map(item => item.productName))];

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Sales Prediction
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          select
          label="Select Product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          fullWidth
          SelectProps={{
            native: true,
          }}
          sx={{ mb: 2 }}
        >
          <option value="">Select a product</option>
          {uniqueProducts.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={handlePredict}
          disabled={!selectedProduct || predicting}
        >
          {predicting ? <CircularProgress size={24} /> : 'Predict Sales'}
        </Button>
      </Box>

      {prediction && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Prediction Results
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Chip
              icon={prediction.trend === 'increasing' ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={`Trend: ${prediction.trend}`}
              color={prediction.trend === 'increasing' ? 'success' : 'error'}
            />
            <Chip
              label={`Confidence: ${prediction.confidence}%`}
              color="primary"
            />
          </Box>
          <Typography variant="body1">
            Predicted Sales for Next Month: ${prediction.nextMonthSales.toLocaleString()}
          </Typography>
        </Box>
      )}

      {!loading && (
        <TableContainer sx={{ mt: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Sales ($)</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.orderDate}</TableCell>
                  <TableCell align="right">${row.sales.toLocaleString()}</TableCell>
                  <TableCell>{row.orderCity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default SalesPrediction; 