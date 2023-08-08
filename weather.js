const axios = require('axios');
require('dotenv').config();
const colors = require('colors');

const apiKey = process.env.API_KEY;

async function getCurrentWeather(cityName) {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5`);
        const weatherData = response.data;
        return weatherData;
    }
    catch (error) {
        console.error('Fehler beim Abrufen der 5-Tage-Wettervorhersage:', error.message);
        process.exit(1);
    }
}

async function displayCurrentWeather(weatherData) {
    console.log('Stadt:', weatherData.location.name.green);
    console.log('Aktuelle Temperatur:', `${weatherData.current.temp_c} °C`.green);
    console.log('Aktuelle Wetterbedingungen:', weatherData.current.condition.text.green);
}

async function currentWeatherForecast(cityName) {
    const weatherData = await getCurrentWeather(cityName);
    displayCurrentWeather(weatherData);
}

async function fiveDayWeatherForecast(cityName) {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5`);
        const weatherData = response.data;
        console.log('Stadt:', weatherData.location.name.green);
        console.log('5-Tage-Vorhersage:');
        weatherData.forecast.forecastday.forEach((day, index) => {
            console.log(`Tag ${index + 1}:`);
            console.log(`Datum: ${day.date.green}`);
            console.log(`Tiefsttemperatur: ${day.day.mintemp_c} °C`.green);
            console.log(`Höchsttemperatur: ${day.day.maxtemp_c} °C`.green);
            console.log(`Wetterbedingungen: ${day.day.condition.text.green}`);
            console.log('---');
    });

} catch (error) {
    console.error('Fehler beim Abrufen der 5-Tage-Wettervorhersage:', error.message);
    process.exit(1);
}
}

async function main() {
    const cityName = process.argv[2];
    if (!cityName) {
      console.log('Bitte geben Sie den Namen der Stadt als Argument ein.');
      process.exit(1);
    }
  
    console.log('Aktuelle Wettervorhersage:');
    await currentWeatherForecast(cityName);
  
    console.log('\n5-Tage-Wettervorhersage:');
    await fiveDayWeatherForecast(cityName);
  }

  main();