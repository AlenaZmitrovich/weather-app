# Приложение о погоде.

## Данные берутся с https://openweathermap.org (для использования сервиса необходимо зарегистрироваться и сгенерировать токен, присвоить его переменной API_KEY в async-functions.js).

## Приложение выводит погоду определенного населенного пункта по запросу в поле ввода. Юзер имеет возможность ввести запрос. По результату запроса юзер имеет возможность просматривать погоду в режиме сегодня и определенного промежутка времени (текущая, на 5 дней вперед – в последнем случае выводится средняя погода на сутки и средняя погода день/ночь). Список последних 10 запросов сохраняется и доступен для просмотра и удаления отдельных позиций. Данные погоды: температура, характер погоды, картинка погоды, также уровень загрязнения воздуха. UI респонсивен.

### Приложение написано на JavaScript. Для создания пользовательского интерфейса используются HTML и CSS. Активно используется Bootstrap.

### Проект организован в виде классов, что упрощает структурирование.

### Для выполнения HTTP-запросов к API используется Fetch API, которая позволяет получать данные и отправлять запросы на сервер.

### Для хранения и управления историей поиска городов используется LocalStorage, который позволяет сохранять данные на стороне клиента.

### Для выполнения асинхронных операций, таких как получение данных из API, используется ключевое слово async/await.

### Для работы с событиями пользователя используются обработчики событий.

### Для манипуляции с элементами DOM используется DomHelper, который предоставляет методы для создания и изменения элементов на веб-странице.

### Эти технологии и решения помогают реализовать функциональность приложения, включая поиск и отображение погодных данных, сохранение истории поиска и взаимодействие с пользователем.
