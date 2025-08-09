import { useState, useEffect } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("Chicago");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({message: "", status: false});

  function weatherDisplay() {
    if(weatherData) {
        return (
            <div id="weather-div">
                <p>Temperature</p><span>{weatherData && weatherData.main.temp}</span>
                <p>Feels Like</p> <span>{weatherData && weatherData.main.feels_like}</span>
                <p>Description</p> <span>{weatherData && weatherData.weather[0].description}</span>
            </div>
        )
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
        setError({message: error.message, status: true})
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [city]);

  return (
    <>
      <section>
        <h2>Current Weather for {city}</h2>

        {error.status && (
          <p>Whoops! Error fetching weather. {error.message} </p>
        )}

        {loading && <p>Loading...</p>}

        {weatherDisplay()}
    
      </section>
    </>
  );
}
