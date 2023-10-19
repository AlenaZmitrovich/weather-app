async function handleTemperatureSearch(city) {
  const forecast5DaysWeather = await getForecast5DaysData(city);
  const arrayOfForecast5daysWeatherList = forecast5DaysWeather.list;

  const sunriseTime = getSunriseTime(forecast5DaysWeather);
  const sunsetTime = getSunsetTime(forecast5DaysWeather);

  const arrayTemperaturesDayTime = [[], [], [], []];
  const arrayTemperaturesNightTime = [[], [], [], []];

  const currentDate = arrayOfForecast5daysWeatherList[0].dt;
  const nextDays = [1, 2, 3, 4];

  arrayOfForecast5daysWeatherList.forEach((element) => {
    const timeOfDataForecasted = element.dt_txt;
    const dateOfDataForecasted = new Date(timeOfDataForecasted).getDate();
    const hoursOfDataForecasted = new Date(timeOfDataForecasted).getHours();

    for (let i = 0; i < nextDays.length; i++) {
      const nextDay = nextDays[i];

      if (
        isDayTime(
          dateOfDataForecasted,
          currentDate,
          nextDay,
          sunriseTime,
          sunsetTime,
          hoursOfDataForecasted
        )
      ) {
        arrayTemperaturesDayTime[i].push(element.main.temp);
      } else if (
        isNightTime(
          dateOfDataForecasted,
          currentDate,
          nextDay,
          sunriseTime,
          sunsetTime,
          hoursOfDataForecasted
        )
      ) {
        arrayTemperaturesNightTime[i].push(element.main.temp);
      }
    }
  });

  const arrayAverageTemperatureDayNight = [
    calculateAverageTemperature(arrayTemperaturesDayTime),
    calculateAverageTemperature(arrayTemperaturesNightTime),
  ];

  return arrayAverageTemperatureDayNight;
}

function isDayTime(
  dateOfDataForecasted,
  currentDate,
  nextDay,
  sunriseTime,
  sunsetTime,
  hoursOfDataForecasted
) {
  const nextDayDate = new Date(
    currentDate * 1000 + nextDay * 24 * 60 * 60 * 1000
  ).getDate();
  return (
    dateOfDataForecasted === nextDayDate &&
    hoursOfDataForecasted >= sunriseTime &&
    hoursOfDataForecasted <= sunsetTime
  );
}

function isNightTime(
  dateOfDataForecasted,
  currentDate,
  nextDay,
  sunriseTime,
  sunsetTime,
  hoursOfDataForecasted
) {
  const nextDayDate = new Date(
    currentDate * 1000 + nextDay * 24 * 60 * 60 * 1000
  ).getDate();
  return (
    dateOfDataForecasted === nextDayDate &&
    (hoursOfDataForecasted > sunsetTime || hoursOfDataForecasted < sunriseTime)
  );
}

function calculateAverageTemperature(temperatures) {
  return temperatures.map((temps) =>
    Math.round(temps.reduce((acc, curr) => acc + curr, 0) / temps.length)
  );
}

function getSunriseTime(forecast5DaysWeather) {
  const { sunrise, timezone } = forecast5DaysWeather.city;
  return new Date(sunrise * 1000 + timezone * 1000).getHours();
}

function getSunsetTime(forecast5DaysWeather) {
  const { sunset, timezone } = forecast5DaysWeather.city;
  return new Date(sunset * 1000 + timezone * 1000).getHours();
}

function changeDateFormat(date) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const shortEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const pluralRules = new Intl.PluralRules('en-US', {
    type: 'ordinal',
  });
  const suffixes = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
  };
  const convertToOrdinal = (number) =>
    `${number}${suffixes[pluralRules.select(number)]}`;

  const extractValueAndCustomizeDayOfMonth = (part) => {
    if (part.type === 'day') {
      return convertToOrdinal(part.value);
    }
    return part.value;
  };

  const shortDate = shortEnUSFormatter
    .formatToParts(date)
    .map(extractValueAndCustomizeDayOfMonth)
    .join('');

  const formattedData = dayOfWeek + ' ' + shortDate;

  return formattedData;
}

function getNextDate(currentDate, daysToAdd) {
  return new Date((currentDate + daysToAdd * 24 * 60 * 60) * 1000);
}
