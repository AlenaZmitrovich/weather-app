class ForecastContainer {
  constructor(element) {
    this.element = element;
  }

  async initialize() {
    const historyStorageElement = await this.#createHistoryStorage();

    if (historyStorageElement !== null) {
      this.element.parentElement.parentElement.classList.remove(
        'backgraund-image'
      );

      this.element.append(historyStorageElement);
    }
  }

  async add(searchedCity) {
    const backgraundImageContainer = document.querySelector('.main');
    backgraundImageContainer.classList.remove('backgraund-image');
    this.element.innerHTML = '';

    const forecastItemElement = await this.#createForecastItem(searchedCity);
    const historyStorageElement = await this.#createHistoryStorage(
      searchedCity
    );

    this.element.append(forecastItemElement[0]);
    this.element.append(forecastItemElement[1]);
    this.element.append(historyStorageElement);
  }

  async #createForecastItem(searchedCity) {
    const forecastItem = new ForecastItem(searchedCity);

    await forecastItem.initialize();

    return forecastItem.element;
  }

  async #createHistoryStorage() {
    await storageHelper.initialize();

    return storageHelper.localStorageContainer;
  }
}
