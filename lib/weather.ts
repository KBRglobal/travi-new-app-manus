/**
 * Weather API — Open-Meteo integration
 * Free, no API key required
 */

export interface WeatherData {
  temp: number; // °C
  condition: string; // e.g. "Sunny", "Cloudy", "Rainy"
  icon: string; // emoji
  humidity: number; // %
  wind: number; // km/h
  feelsLike: number; // °C
}

// Destination coordinates (major cities)
const COORDS: Record<string, { lat: number; lon: number }> = {
  dubai: { lat: 25.2048, lon: 55.2708 },
  kyoto: { lat: 35.0116, lon: 135.7681 },
  bali: { lat: -8.4095, lon: 115.1889 },
  barcelona: { lat: 41.3874, lon: 2.1686 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  paris: { lat: 48.8566, lon: 2.3522 },
  london: { lat: 51.5074, lon: -0.1278 },
  newyork: { lat: 40.7128, lon: -74.0060 },
  losangeles: { lat: 34.0522, lon: -118.2437 },
  miami: { lat: 25.7617, lon: -80.1918 },
  sydney: { lat: -33.8688, lon: 151.2093 },
  singapore: { lat: 1.3521, lon: 103.8198 },
};

// WMO weather codes → human-readable conditions
// https://open-meteo.com/en/docs
const WMO_CODES: Record<number, { condition: string; icon: string }> = {
  0: { condition: "Clear", icon: "☀️" },
  1: { condition: "Mostly Clear", icon: "🌤" },
  2: { condition: "Partly Cloudy", icon: "⛅" },
  3: { condition: "Overcast", icon: "☁️" },
  45: { condition: "Foggy", icon: "🌫" },
  48: { condition: "Foggy", icon: "🌫" },
  51: { condition: "Light Drizzle", icon: "🌦" },
  53: { condition: "Drizzle", icon: "🌦" },
  55: { condition: "Heavy Drizzle", icon: "🌧" },
  61: { condition: "Light Rain", icon: "🌧" },
  63: { condition: "Rain", icon: "🌧" },
  65: { condition: "Heavy Rain", icon: "🌧" },
  71: { condition: "Light Snow", icon: "🌨" },
  73: { condition: "Snow", icon: "🌨" },
  75: { condition: "Heavy Snow", icon: "❄️" },
  77: { condition: "Snow Grains", icon: "🌨" },
  80: { condition: "Light Showers", icon: "🌦" },
  81: { condition: "Showers", icon: "🌧" },
  82: { condition: "Heavy Showers", icon: "⛈" },
  85: { condition: "Light Snow Showers", icon: "🌨" },
  86: { condition: "Snow Showers", icon: "🌨" },
  95: { condition: "Thunderstorm", icon: "⛈" },
  96: { condition: "Thunderstorm with Hail", icon: "⛈" },
  99: { condition: "Severe Thunderstorm", icon: "⛈" },
};

/**
 * Fetch current weather for a destination.
 * Uses Open-Meteo free API (no key required).
 */
export async function fetchWeather(destination: string): Promise<WeatherData | null> {
  const coords = COORDS[destination.toLowerCase()];
  if (!coords) {
    console.warn(`[weather] Unknown destination: ${destination}`);
    return null;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const current = data.current;

    const wmoCode = current.weather_code as number;
    const wmo = WMO_CODES[wmoCode] ?? { condition: "Unknown", icon: "🌡️" };

    return {
      temp: Math.round(current.temperature_2m),
      condition: wmo.condition,
      icon: wmo.icon,
      humidity: Math.round(current.relative_humidity_2m),
      wind: Math.round(current.wind_speed_10m),
      feelsLike: Math.round(current.apparent_temperature),
    };
  } catch (err) {
    console.error("[weather] Fetch failed:", err);
    return null;
  }
}
