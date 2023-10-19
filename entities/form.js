class Form {
  constructor(formElement) {
    this.formElement = formElement;
    this.formInput = null;
    this.onSubmit = null;
    this.handleCitySearch = this.handleCitySearch.bind(this);
  }

  get searchedCity() {
    return this.formInput.value;
  }

  initialize() {
    this.formInput = this.formElement.querySelector('#form-input');
    this.formElement.addEventListener('submit', this.handleCitySearch);
  }

  async handleCitySearch(event) {
    event.preventDefault();

    const searchedCity = this.searchedCity;
    const alertContainer = document.querySelector('.alert-message-container');

    if (!this.checkInputValue(searchedCity)) {
      alert('You need to enter valid city title');
      return;
    }

    try {
      this.onSubmit(searchedCity);

      alertContainer.innerHTML = '';
      this.formInput.value = '';
    } catch (error) {
      console.error(error);
      alert('An error occurred while searching for the city.');
    }
  }

  checkInputValue(value) {
    return value.trim() !== '';
  }
}
