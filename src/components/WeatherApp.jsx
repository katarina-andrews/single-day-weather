import { useState, useEffect } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("Chicago");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {

    async function getWeather() {
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

      } finally {
      }
    }

    getWeather();
  }, [city]);

  return (
    <>
      <section>
        <h2>Current Weather for {city}</h2>
        {weatherData && weatherData.main.temp}
        <br/>
        {weatherData && weatherData.main.feels_like}

        <br/>
        {weatherData && weatherData.weather[0].main}
          <br/>
        {weatherData && weatherData.weather[0].description}

        {/* <form>
            <label htmlFor="city">Enter a City</label>
            <input type="text" name="city" id="city" />
            <button type="submit">Get Weather</button>
        </form> */}
      </section>
    </>
  );
}
