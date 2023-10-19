class StorageHelper {
  constructor(searchedCity, forecastElement) {
    this.localStorageContainer = null;
    this.searchedCity = searchedCity;
    this.forecastElement = forecastElement;
    this.arrayOfKeysForLocalStorage = Array.from(
      Array(10),
      (_, index) => `LocalStorageKey${index}`
    );

    this.initialize();
  }

  initialize() {
    const seeLocalStorageItem = this.seeLocalStorageItem.bind(this);
    const deleteLocalStorageItem = this.deleteLocalStorageItem.bind(this);

    this.localStorageContainer = null;

    this.arrayOfKeysForLocalStorage.forEach((key) => {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== 'null' && storedValue !== null) {
        const localStorageCardBody = DomHelper.createLocalStorageCardBody([]);
        const localContainerCard = DomHelper.createLocalContainerCard([
          localStorageCardBody,
        ]);
        const localStorageTitle = DomHelper.createLocalStorageTitle();

        this.arrayOfKeysForLocalStorage.forEach((keys) => {
          const value = localStorage.getItem(keys);
          if (value !== 'null' && value !== null) {
            const localStorageElement = DomHelper.createLocalStorage(value);
            const localStorageSeeButton = DomHelper.createLocalStorageSeeButton(
              [{ event: 'click', handler: seeLocalStorageItem }]
            );
            const localStorageDeleteButton =
              DomHelper.createLocalStorageDeleteButton([
                { event: 'click', handler: deleteLocalStorageItem },
              ]);
            const localStorageItem = DomHelper.createLocalStorageItem([
              localStorageElement,
              localStorageSeeButton,
              localStorageDeleteButton,
            ]);
            localStorageCardBody.append(localStorageItem);
          }
        });

        this.localStorageContainer = DomHelper.createLocalStorageContainer([
          localStorageTitle,
          localContainerCard,
        ]);
      }
    });
  }

  async handleLocalStorageItem(searchedCity) {
    const setLocalStorageValue = this.setLocalStorageValue;

    this.cityName = await findCityName(searchedCity);
    this.setLocalStorageValue(this.cityName);
  }

  setLocalStorageValue(city) {
    const cityAlreadyExists = this.arrayOfKeysForLocalStorage.some((key) => {
      const item = localStorage.getItem(key);
      return item === city;
    });

    if (!cityAlreadyExists) {
      if (
        this.arrayOfKeysForLocalStorage.every(
          (key) =>
            localStorage.getItem(key) !== null &&
            localStorage.getItem(key) !== 'null'
        )
      ) {
        for (let i = this.arrayOfKeysForLocalStorage.length - 1; i > 0; i--) {
          const key = this.arrayOfKeysForLocalStorage[i];
          const prevKey = this.arrayOfKeysForLocalStorage[i - 1];
          const prevValue = localStorage.getItem(prevKey);
          localStorage.setItem(key, prevValue);
        }
        localStorage.setItem('LocalStorageKey0', null);
      }

      for (let i = this.arrayOfKeysForLocalStorage.length - 1; i >= 0; i--) {
        const key = this.arrayOfKeysForLocalStorage[i];
        if (
          localStorage.getItem(key) === null ||
          localStorage.getItem(key) === 'null'
        ) {
          localStorage.setItem(key, city);
          break;
        }
      }
    }
  }

  deleteLocalStorageItem(event) {
    const itemToDelete = event.target.parentElement;
    const valueToRemove = itemToDelete.firstChild.textContent;
    const localStorageCardBody = itemToDelete.parentElement;

    itemToDelete.remove();

    if (localStorageCardBody.children.length === 0) {
      localStorageCardBody.parentElement.parentElement.remove();
    }

    this.removeItemFromLocalStorage(valueToRemove);
  }

  removeItemFromLocalStorage(valueToRemove) {
    const indexOfItemToRemove = this.arrayOfKeysForLocalStorage.findIndex(
      (key) => localStorage.getItem(key) === valueToRemove
    );

    if (indexOfItemToRemove !== -1) {
      const keyToRemove = this.arrayOfKeysForLocalStorage[indexOfItemToRemove];
      localStorage.removeItem(keyToRemove);
    }

    this.checkLocalStorageOrder();
  }

  seeLocalStorageItem(event) {
    this.deleteLocalStorageItem(event);
    this.localStorageContainer = null;
    const city = event.target.parentElement.firstChild.textContent;

    this.forecastElement.add(city);
    this.handleLocalStorageItem(city);
  }

  checkLocalStorageOrder() {
    for (let i = this.arrayOfKeysForLocalStorage.length - 1; i >= 0; i--) {
      const key = this.arrayOfKeysForLocalStorage[i];
      const previousKey = this.arrayOfKeysForLocalStorage[i - 1];
      if (
        localStorage.getItem(key) === null ||
        localStorage.getItem(key) === 'null'
      ) {
        localStorage.setItem(key, localStorage.getItem(previousKey));
        localStorage.removeItem(previousKey);
      }
    }
  }
}
