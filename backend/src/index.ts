import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { WeatherData, WeatherError } from './types/weather';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    console.log('Fetching weather for city:', city);
    console.log('API URL:', `${process.env.OPENWEATHER_BASE_URL}/weather`);
    
    const response = await axios.get<WeatherData>(
      `${process.env.OPENWEATHER_BASE_URL}/weather`,
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric',
        },
      }
    );
    console.log('Weather data received:', response.data);
    res.json(response.data);
  } catch (error: any) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    const weatherError: WeatherError = {
      message: error.response?.data?.message || 'Failed to fetch weather data',
      status: error.response?.status || 500,
    };
    res.status(weatherError.status).json(weatherError);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('OpenWeather API Key:', process.env.OPENWEATHER_API_KEY?.substring(0, 5) + '...');
  console.log('OpenWeather Base URL:', process.env.OPENWEATHER_BASE_URL);
});
