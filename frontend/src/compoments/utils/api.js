import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

export async function getWeahter(city) {
  try {
    const res = await api.get(`?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_ID}`);
    return { succes: true, weather: res.data.weather[0].main };
  } catch (e) {
    return { succes: false };
  }
}
