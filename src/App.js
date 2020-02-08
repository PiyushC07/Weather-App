import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./app.component/weather.component";
import Form from "./app.component/form.component";
import "./App.css";

// api.openweathermap.org/data/2.5/weather?q=London

const API_KEY = "1844b3e5c83c4793ad74f913b78125a9";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      temp: undefined,
      min_temp: undefined,
      max_temp: undefined,
      description: undefined,
      error:false
    };
 
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calTemp(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 672:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 700 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 800 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }
  getWeather = async (e) => {

e.preventDefault();

const city = e.target.elements.city.value;
const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
    );
    const response = await api_call.json();
    console.log(response);

    this.setState({
      city: `${response.name},${response.sys.country}`,
      temp: this.calTemp(response.main.temp),
      min_temp: this.calTemp(response.main.temp_min),
      max_temp: this.calTemp(response.main.temp_max),
      description: response.weather[0].main
    });
    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
  
    }
    else{
      this.setState({error:true})

    }
  };
  render() {
    return (
      <div className="App">
      <h1>Weather App</h1>
        <Form loadWeather={this.getWeather} error={this.state.error}/>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp={this.state.temp}
          min_temp={this.state.min_temp}
          max_temp={this.state.max_temp}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
