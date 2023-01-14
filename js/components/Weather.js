import { getWeatherLink } from '../apiLinks';
import { OPTIONS, saveOptions } from '../options';
import { translations } from '../translations';

const icon = document.querySelector('.weather-icon');
const desc = document.querySelector('.weather-description');
const errorMsg = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('input.city');

const renderWeather = data => {
  errorMsg.textContent = '';
  icon.className = `weather-icon owf owf-${data.weather[0].id}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  desc.textContent = data.weather[0].description;
  wind.textContent = `${translations.wind[OPTIONS.lang]}: ${data.wind.speed} ${
    translations.windValue[OPTIONS.lang]
  }`;
  humidity.textContent = `${translations.humidity[OPTIONS.lang]}: ${
    data.main.humidity
  }%`;
};

const renderError = () => {
  [desc, wind, humidity, temperature].forEach(el => (el.textContent = ''));

  errorMsg.textContent = translations.weatherError[OPTIONS.lang];
};

const fetchWeatherData = async city => {
  const url = getWeatherLink(city, OPTIONS.lang);

  try {
    const data = await (await fetch(url)).json();

    renderWeather(data);
  } catch (err) {
    renderError();

    console.log(err);
  }
};

city.addEventListener('input', e => {
  // TODO: Debounce
  fetchWeatherData(e.target.value);
  OPTIONS.city = e.target.value;
  saveOptions();
});

export const Weather = () => {
  fetchWeatherData(OPTIONS.city);
};
