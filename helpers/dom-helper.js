class DomHelper {
  static createCurrentWeatherContainer(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['col-sm-12', 'col-md-3', 'current-weather-container'],
      children,
      childrenAction: 'append',
    });
  }

  static async createWeatherDate(city) {
    const weatherDate = await getTimeOfDataCalculation(city);
    const cityName = await findCityName(city);
    return DomHelper.createElement({
      tag: 'h5',
      classList: ['weather-date'],
      textContent: `${cityName}, ${weatherDate}`,
    });
  }

  static createCard(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['card', 'h-100'],
      children,
      childrenAction: 'append',
    });
  }

  static async createWeatherIcon(city) {
    const weatherIcon = await getWeatherIcon(city);
    return DomHelper.createElement({
      tag: 'img',
      classList: ['card-img-top'],
      attributes: [
        { prop: 'alt', value: 'weather icon' },
        { prop: 'src', value: weatherIcon },
      ],
    });
  }

  static createCardBody(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['card-body'],
      children,
      childrenAction: 'append',
    });
  }

  static async createCardDescription(city) {
    const weatherDescription = await getWeatherDescription(city);
    return DomHelper.createElement({
      tag: 'h5',
      classList: ['card-title'],
      textContent: weatherDescription,
    });
  }

  static async createCardTemperature(city) {
    const currentTemperature = await getCurrentTemperature(city);
    return DomHelper.createElement({
      tag: 'p',
      classList: ['card-text'],
      textContent: currentTemperature + '℃',
    });
  }

  static async createCardAirQuolity(city) {
    const currentAirPollutionDescription =
      await getCurrentAirPollutionDescription(city);
    return DomHelper.createElement({
      tag: 'p',
      classList: ['card-text'],
      textContent: currentAirPollutionDescription,
    });
  }

  static async createForecastContainer(fun) {
    const children = await fun;
    return DomHelper.createElement({
      tag: 'div',
      classList: [
        'row',
        'row-cols-1',
        'row-cols-md-2',
        'g-4',
        'forecast-width',
      ],
      children,
      childrenAction: 'append',
    });
  }

  static createForecastCol1El(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['col'],
      children,
      childrenAction: 'append',
    });
  }

  static createForecastCard1El(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['card'],
      children,
      childrenAction: 'append',
    });
  }

  static createForecastCardBodyEl(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['card-body'],
      children,
      childrenAction: 'append',
    });
  }

  static async createForecastWeatherDate1El(city, elFromArray) {
    const forecastWeatherDate = await getDatesForForecast(city);
    return DomHelper.createElement({
      tag: 'h5',
      classList: ['card-title', 'weather-date'],
      textContent: forecastWeatherDate[elFromArray],
    });
  }

  static async createForecastAverageTemperature1El(city, elFromArray) {
    const forecastAverageTemperature = await getAverageTemperature(city);
    return DomHelper.createElement({
      tag: 'p',
      classList: ['card-text'],
      textContent: `Average temperature: ${forecastAverageTemperature[elFromArray]}℃`,
    });
  }

  static async createForecastAverageTemperatureNighttime1El(city, elFromArray) {
    const forecastAverageTemperatureNighttime =
      await getAverageTemperatureNightAndDay(city);
    return DomHelper.createElement({
      tag: 'p',
      classList: ['card-text'],
      textContent: `Average temperature in the nighttime: ${forecastAverageTemperatureNighttime[1][elFromArray]}℃`,
    });
  }

  static async createForecastAverageTemperatureDaytime1El(city, elFromArray) {
    const forecastAverageTemperatureDaytime =
      await getAverageTemperatureNightAndDay(city);
    return DomHelper.createElement({
      tag: 'p',
      classList: ['card-text'],
      textContent: `Average temperature in the daytime: ${forecastAverageTemperatureDaytime[0][elFromArray]}℃`,
    });
  }

  static createLocalStorageContainer(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['col-sm-12', 'col-md-3', 'recent-request-column'],
      children,
      childrenAction: 'append',
    });
  }

  static createLocalStorageTitle() {
    return DomHelper.createElement({
      tag: 'h5',
      classList: ['card-title', 'weather-date'],
      textContent: 'List of your recent requests:',
    });
  }

  static createLocalContainerCard(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['card', 'recent-requests-container'],
      children,
      childrenAction: 'append',
    });
  }

  static createLocalStorageCardBody() {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['card-body', 'local-storage-card-body'],
    });
  }

  static createLocalStorageItem(children) {
    return DomHelper.createElement({
      tag: 'div',
      classList: ['card-item'],
      children,
      childrenAction: 'append',
    });
  }

  static createLocalStorage(localStorageContent) {
    return DomHelper.createElement({
      tag: 'p',
      classList: ['card-text', 'recent-request-city'],
      textContent: localStorageContent,
    });
  }

  static createLocalStorageDeleteButton(handlers) {
    return DomHelper.createElement({
      tag: 'button',
      classList: ['btn', 'btn-outline-danger'],
      textContent: 'Delete',
      attributes: [{ prop: 'type', value: 'button' }],
      handlers,
    });
  }

  static createLocalStorageSeeButton(handlers) {
    return DomHelper.createElement({
      tag: 'button',
      classList: ['btn', 'btn-outline-info'],
      textContent: 'See',
      attributes: [{ prop: 'type', value: 'button' }],
      handlers,
    });
  }

  static createAlertEl() {
    return DomHelper.createElement({
      tag: 'p',
      classList: ['btn', 'btn-danger', 'alert-message'],
      textContent: 'No results found',
    });
  }

  static createElement({
    tag,
    classList,
    attributes,
    textContent,
    handlers,
    children,
    childrenAction,
  }) {
    const element = document.createElement(tag);

    if (classList?.length) {
      element.classList.add(...classList);
    }

    if (attributes?.length) {
      attributes.forEach(({ prop, value }) => {
        element.setAttribute(prop, value);
      });
    }

    if (textContent) {
      element.textContent = textContent;
    }

    if (handlers?.length) {
      handlers.forEach(({ event, handler }) => {
        element.addEventListener(event, handler);
      });
    }

    if (children) {
      element[childrenAction](...children);
    }

    return element;
  }
}
