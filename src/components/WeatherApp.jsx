import { useState, useEffect } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("Chicago");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", status: false });

  function weatherDisplay() {
    if (weatherData) {
      return (
        <>
          <h2>Temperature (in fahrenheit)</h2>
          <table>
            <tbody>
              <tr>
                <td>Current</td>
                <td>{weatherData && weatherData.main.temp}</td>
              </tr>
              <tr>
                <td>Feels like</td>
                <td>{weatherData && weatherData.main.feels_like}</td>
              </tr>
              <tr>
                <td>Minimum</td>
                <td>{weatherData && weatherData.main.temp_min}</td>
              </tr>
              <tr>
                <td>Maximum</td>
                <td>{weatherData && weatherData.main.temp_max}</td>
              </tr>
            </tbody>
          </table>

          <h2>Additional information</h2>
          <table>
            <tbody>
              <tr>
                <td>Humidity</td>
                <td>{weatherData && weatherData.main.humidity} %</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{weatherData && weatherData.weather[0].description}</td>
              </tr>
              <tr>
                <td>Wind</td>
                <td>{weatherData && weatherData.wind.speed} mph</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    }
  }

  useEffect(() => {
    async function getWeather() {
      setLoading(true);
      const key = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        setWeatherData(result);
      } catch (error) {
        console.error(error);
        setError({ message: error.message, status: true });
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [city]);

  return (
    <>
      <section>
        <h2 id="title">{city}</h2>

        {error.status && <p>Error fetching weather. {error.message} </p>}

        {loading && <p>Loading...</p>}

        {weatherDisplay()}
      </section>
    </>
  );
}
