import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import DataChartAndTable from "./Components/DataChartAndTable";
import { format, parseISO } from "date-fns";

function App() {
  const [weatherData, setweatherData] = useState(null);
  const [parameter, setParameter] = useState({});

  const processWeatherData = (data) => {
    const {
      time,
      temperature_2m_max,
      temperature_2m_min,
      temperature_2m_mean,
      apparent_temperature_max,
      apparent_temperature_min,
      apparent_temperature_mean,
    } = data;

    return time.map((date, index) => ({
      date: format(parseISO(date), "MMM dd"),
      tempMax: temperature_2m_max[index],
      tempMin: temperature_2m_min[index],
      tempMean: temperature_2m_mean[index],
      appTempMax: apparent_temperature_max[index],
      appTempMin: apparent_temperature_min[index],
      appTempMean: apparent_temperature_mean[index],
    }));
  };

  const onFormSubmit = (weatherData, formData) => {
    if (!weatherData || !formData) {
      console.warn("Missing weather data or form data");
      return;
    }
    const processedData = processWeatherData(weatherData);
    setweatherData(processedData);
    setParameter(formData);
    console.log("in app", processedData, formData);
  };

  useEffect(() => {
    console.log("Updated parameter state:", parameter);
  }, [parameter]);

  return (
    <>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Weather Dashboard
          </h2>
          <span className="mb-8 text-muted-foreground">
            View historical weather data for any location using the Open-Meteo
            API.
          </span>
        </div>
        <Dashboard onSubmitData={onFormSubmit} />
        {weatherData && (
          <DataChartAndTable data={weatherData} weatherParams={parameter} />
        )}
      </div>
      <div className="text-center mb-2">
        <a
          href="https://github.com/hardik1452/open_meteo_weather_dashboard"
          target="_blank"
        >
          <span>Made with ❤ from Hardik</span>
        </a>
      </div>
    </>
  );
}

export default App;
