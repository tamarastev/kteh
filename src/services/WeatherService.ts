export interface IWeatherSnapshot {
  temperatureC: number;
  windSpeedKmh: number;
  description: string;
}

const WEATHER_CODE_DESCRIPTIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
};

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function getCurrentWeather(
  lat: number | string,
  lon: number | string
): Promise<IWeatherSnapshot> {
  const url = `${FORECAST_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    current_weather: { temperature: number; windspeed: number; weathercode: number };
  };

  const { temperature, windspeed, weathercode } = data.current_weather;

  return {
    temperatureC: temperature,
    windSpeedKmh: windspeed,
    description: WEATHER_CODE_DESCRIPTIONS[weathercode] ?? "Unknown",
  };
}
