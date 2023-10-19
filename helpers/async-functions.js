const API_KEY = '';

// по названию города найти на него данные
async function findCity(city) {
  try {
    const geocoding = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const geocodingData = await geocoding.json();
    return geocodingData;
  } catch (error) {
    throw new Error(`Error finding city: ${error.message}`);
  }
}

async function findCityName(city) {
  try {
    const geocodingData = await findCity(city);
    const cityName = geocodingData[0].name;
    return cityName;
  } catch (error) {
    throw new Error(`Error finding city name: ${error.message}`);
  }
}

// найти широту и долготу
async function getLatitudeAndLongitude(city) {
  try {
    const geocodingData = await findCity(city);

    const latitude = geocodingData[0].lat;
    const longitude = geocodingData[0].lon;
    return [latitude, longitude];
  } catch (error) {
    throw new Error(`Error getting latitude and longitude: ${error.message}`);
  }
}

// найти актуальные погодные данные
async function getCurrentData(city) {
  try {
    const [latitude, longitude] = await getLatitudeAndLongitude(city);
    const currentData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const currentWeatherData = await currentData.json();
    return currentWeatherData;
  } catch (error) {
    throw new Error(`Error getting latitude and longitude: ${error.message}`);
  }
}

// найти дату
async function getTimeOfDataCalculation(city) {
  try {
    const currentWeatherData = await getCurrentData(city);
    const timeOfDataCalculation = currentWeatherData.dt;
    const dateOfDataCalculation = new Date(timeOfDataCalculation * 1000);

    const currentDate = changeDateFormat(dateOfDataCalculation);
    return currentDate;
  } catch (error) {
    throw new Error(`Error getting time of data calculation: ${error.message}`);
  }
}

// найти температуру
async function getCurrentTemperature(city) {
  try {
    const currentWeatherData = await getCurrentData(city);
    const temperature = Math.round(currentWeatherData.main.temp);

    return temperature;
  } catch (error) {
    throw new Error(`Error getting current temperature: ${error.message}`);
  }
}

// найти характер погоды
async function getWeatherDescription(city) {
  try {
    const currentWeatherData = await getCurrentData(city);
    const weatherDescription = currentWeatherData.weather[0].description;

    return weatherDescription;
  } catch (error) {
    throw new Error(`Error getting weather description: ${error.message}`);
  }
}

// найти ид картинки, описывающей погоду
async function getWeatherIconId(city) {
  try {
    const currentWeatherData = await getCurrentData(city);
    const weatherIconId = currentWeatherData.weather[0].icon;
    return weatherIconId;
  } catch (error) {
    throw new Error(`Error getting weather icon ID: ${error.message}`);
  }
}

// найти url картинки, описывающей погоду
async function getWeatherIcon(city) {
  try {
    const weatherIconId = await getWeatherIconId(city);
    const icon = await fetch(
      `https://openweathermap.org/img/wn/${weatherIconId}@2x.png`
    );
    const weatherIcon = icon.url;

    return weatherIcon;
  } catch (error) {
    throw new Error(`Error getting weather icon: ${error.message}`);
  }
}

// найти актуальное загрязнение воздуха
async function getCurrentAirPollutionData(city) {
  try {
    const [latitude, longitude] = await getLatitudeAndLongitude(city);
    const currentAirPollutionData = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const currentPollutionData = await currentAirPollutionData.json();
    return currentPollutionData;
  } catch (error) {
    throw new Error(
      `Error getting current air pollution data: ${error.message}`
    );
  }
}

// найти описание актуального загрязнения воздуха
async function getCurrentAirPollutionDescription(city) {
  try {
    let currentAirPollutionDescription = '';
    const currentPollutionData = await getCurrentAirPollutionData(city);
    const airQualityIndex = currentPollutionData.list[0].main.aqi;

    switch (airQualityIndex) {
      case 1:
        currentAirPollutionDescription = 'The air quality is good';
        break;
      case 2:
        currentAirPollutionDescription = 'The air quality is fair';
        break;
      case 3:
        currentAirPollutionDescription = 'The air quality is moderate';
        break;
      case 4:
        currentAirPollutionDescription = 'The air quality is poor';
        break;
      case 5:
        currentAirPollutionDescription = 'The air quality is very poor';
        break;
    }

    return currentAirPollutionDescription;
  } catch (error) {
    throw new Error(
      `Error getting current air pollution description: ${error.message}`
    );
  }
}

// найти погодные данные на 5 дней
async function getForecast5DaysData(city) {
  try {
    const [latitude, longitude] = await getLatitudeAndLongitude(city);
    const forecast5DaysData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const forecast5DaysWeather = await forecast5DaysData.json();
    return forecast5DaysWeather;
  } catch (error) {
    throw new Error(`Error getting 5-day forecast data: ${error.message}`);
  }
}

// найти даты на прогноз погоды
async function getDatesForForecast(city) {
  try {
    const forecast5DaysWeather = await getForecast5DaysData(city);
    const currentDate = forecast5DaysWeather.list[0].dt;
    const arrayOfFormattedDates = [];
    const numberOfDays = 4;

    for (let i = 1; i <= numberOfDays; i++) {
      const nextDate = getNextDate(currentDate, i);
      const formattedDate = changeDateFormat(nextDate);
      arrayOfFormattedDates.push(formattedDate);
    }

    return arrayOfFormattedDates;
  } catch (error) {
    throw new Error('Failed to get forecast dates');
  }
}

// для прогноза на 4 дня найти среднюю температуру за сутки
async function getAverageTemperature(city) {
  try {
    const forecast5DaysWeather = await getForecast5DaysData(city);
    const forecastData = forecast5DaysWeather.list;
    const currentDate = forecastData[0].dt;
    const futureDates = [];
    const numberOfDays = 4;

    for (let i = 1; i <= numberOfDays; i++) {
      const nextDate = getNextDate(currentDate, i);
      futureDates.push(nextDate);
    }

    const getAverageTemperatureForDay = (date) => {
      const temperatures = forecastData
        .filter((element) => {
          const forecastDate = new Date(element.dt_txt).getDate();
          return forecastDate === date.getDate();
        })
        .map((element) => element.main.temp);

      const averageTemperature = Math.round(
        temperatures.reduce((sum, temperature) => sum + temperature, 0) /
          temperatures.length
      );

      return averageTemperature;
    };

    const arrayOfAverageTemperatures = futureDates.map((date) =>
      getAverageTemperatureForDay(date)
    );

    return arrayOfAverageTemperatures;
  } catch (error) {
    throw new Error('Failed to get average temperatures');
  }
}

// для прогноза на 4 дня найти среднюю температуру за день / ночь

async function getAverageTemperatureNightAndDay(city) {
  try {
    return handleTemperatureSearch(city);
  } catch (error) {
    throw new Error(
      `Error getting average temperature for day and night: ${error.message}`
    );
  }
}
