const formElement = new Form(document.querySelector('#form'));
const forecastElement = new ForecastContainer(
  document.querySelector('#forecast-container')
);
const storageHelper = new StorageHelper(forecastElement);
const app = new App(formElement, forecastElement, storageHelper);

app.run();
