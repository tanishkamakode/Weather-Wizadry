let weather = {
  apiKey: "4a4743f6fa115cb4245a4283e222e0d1",
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch(() => this.showErrorMessage());
  },

  displayWeather: function (data) {
    if (data.cod === 200) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      console.log(name, icon, description, temp, humidity, speed);
      document.querySelector(".city").innerText = `Weather in ${name}`;
      document.querySelector(
        ".icon"
      ).src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = `${temp} °C `;
      document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
      document.querySelector(".wind").innerText = `Wind Speed: ${speed} km/hr`;
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + " ')";
    } else {
      this.showErrorMessage();
    }
  },

  showErrorMessage: function () {
    alert("No such city exists. Please enter a valid city name.");
  },

  search: function () {
    const city = document.querySelector(".search-bar").value;
    this.fetchWeather(city);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    weather.search();
  }
});
