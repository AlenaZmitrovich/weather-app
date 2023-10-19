class App {
  constructor(formElement, forecastElement, storageHelper) {
    this.formElement = formElement;
    this.forecastElement = forecastElement;
    this.storageHelper = storageHelper;
  }

  async run() {
    this.formElement.initialize();
    this.forecastElement.initialize();

    this.storageHelper.forecastElement = this.forecastElement;
    const alertContainer = document.querySelector('.alert-message-container');

    this.formElement.onSubmit = async (searchedCity) => {
      try {
        await this.forecastElement.add(searchedCity);
        await this.storageHelper.handleLocalStorageItem(searchedCity);
        alertContainer.innerHTML = '';
      } catch (error) {
        const alertEl = DomHelper.createAlertEl();
        alertContainer.append(alertEl);
      }
    };
  }
}
