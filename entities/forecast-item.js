class ForecastItem {
  constructor(searchedCity) {
    this.element = null;
    this.searchedCity = searchedCity;

    this.initialize();
  }

  async initialize() {
    const createForecastCard = this.createForecastCard;

    this.elementForecast = await DomHelper.createForecastContainer([
      await createForecastCard(this.searchedCity, 0),
      await createForecastCard(this.searchedCity, 1),
      await createForecastCard(this.searchedCity, 2),
      await createForecastCard(this.searchedCity, 3),
    ]);

    this.cardAirQuolity = await DomHelper.createCardAirQuolity(
      this.searchedCity
    );

    this.cardTemperature = await DomHelper.createCardTemperature(
      this.searchedCity
    );
    this.cardDescription = await DomHelper.createCardDescription(
      this.searchedCity
    );
    this.cardBody = await DomHelper.createCardBody([
      this.cardDescription,
      this.cardTemperature,
      this.cardAirQuolity,
    ]);
    this.weatherIcon = await DomHelper.createWeatherIcon(this.searchedCity);
    this.card = await DomHelper.createCard([this.weatherIcon, this.cardBody]);
    this.weatherDate = await DomHelper.createWeatherDate(this.searchedCity);

    this.elementCurrent = await DomHelper.createCurrentWeatherContainer([
      this.weatherDate,
      this.card,
    ]);

    this.element = [this.elementCurrent, this.elementForecast];
  }

  async createForecastCard(city, elFromArray) {
    const forecastAverageTemperatureNighttime1El =
      await DomHelper.createForecastAverageTemperatureNighttime1El(
        city,
        elFromArray
      );
    const forecastAverageTemperatureDaytime1El =
      await DomHelper.createForecastAverageTemperatureDaytime1El(
        city,
        elFromArray
      );
    const forecastAverageTemperature1El =
      await DomHelper.createForecastAverageTemperature1El(city, elFromArray);
    const forecastWeatherDate1El = await DomHelper.createForecastWeatherDate1El(
      city,
      elFromArray
    );
    const forecastCardBody1El = await DomHelper.createForecastCardBodyEl([
      forecastWeatherDate1El,
      forecastAverageTemperature1El,
      forecastAverageTemperatureNighttime1El,
      forecastAverageTemperatureDaytime1El,
    ]);
    const forecastCard1El = await DomHelper.createForecastCard1El([
      forecastCardBody1El,
    ]);
    const forecastCol1El = await DomHelper.createForecastCol1El([
      forecastCard1El,
    ]);

    return forecastCol1El;
  }
}
