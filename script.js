const dateElement = document.querySelector("#today");

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  }).format(new Date());
}

const weatherElement = document.querySelector("#weather");
const weatherIcon = document.querySelector("#weather-icon");
const weatherTemperature = document.querySelector("#weather-temp");
const weatherCondition = document.querySelector("#weather-condition");

const weatherDescriptions = {
  0: ["Clear", "☀️"],
  1: ["Mostly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Cloudy", "☁️"],
  45: ["Foggy", "🌫️"],
  48: ["Foggy", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Heavy drizzle", "🌧️"],
  56: ["Freezing drizzle", "🌧️"],
  57: ["Freezing drizzle", "🌧️"],
  61: ["Light rain", "🌦️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  66: ["Freezing rain", "🌧️"],
  67: ["Freezing rain", "🌧️"],
  71: ["Light snow", "🌨️"],
  73: ["Snow", "🌨️"],
  75: ["Heavy snow", "❄️"],
  77: ["Snow grains", "❄️"],
  80: ["Light showers", "🌦️"],
  81: ["Showers", "🌧️"],
  82: ["Heavy showers", "🌧️"],
  85: ["Snow showers", "🌨️"],
  86: ["Snow showers", "🌨️"],
  95: ["Thunderstorms", "⛈️"],
  96: ["Storms with hail", "⛈️"],
  99: ["Storms with hail", "⛈️"],
};

async function loadWeather() {
  if (!weatherElement || !weatherIcon || !weatherTemperature || !weatherCondition) return;

  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.search = new URLSearchParams({
    latitude: "43.14453",
    longitude: "-87.908356",
    current: "temperature_2m,weather_code,is_day",
    daily: "temperature_2m_max,temperature_2m_min",
    temperature_unit: "fahrenheit",
    timezone: "America/Chicago",
    forecast_days: "1",
  });

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);

    const data = await response.json();
    const [description, daytimeIcon] = weatherDescriptions[data.current.weather_code] ?? ["Current weather", "🌡️"];
    const icon = data.current.is_day === 0 && data.current.weather_code <= 1 ? "🌙" : daytimeIcon;
    const temperature = Math.round(data.current.temperature_2m);
    const high = Math.round(data.daily.temperature_2m_max[0]);
    const low = Math.round(data.daily.temperature_2m_min[0]);

    weatherIcon.textContent = icon;
    weatherTemperature.textContent = `${temperature}°F`;
    weatherCondition.textContent = `${description} · 53217`;
    weatherElement.title = `${description} in 53217 · High ${high}° · Low ${low}°`;
    weatherElement.setAttribute(
      "aria-label",
      `${description} and ${temperature} degrees Fahrenheit in 53217. High ${high}, low ${low}.`,
    );
  } catch (error) {
    weatherIcon.textContent = "🌡️";
    weatherTemperature.textContent = "--°";
    weatherCondition.textContent = "Weather unavailable";
    weatherElement.setAttribute("aria-label", "Weather for 53217 is temporarily unavailable");
    console.warn(error);
  }
}

loadWeather();

const appMessage = document.querySelector("#app-message");
const dismissMessage = document.querySelector("#dismiss-message");
const pageParameters = new URLSearchParams(window.location.search);

if (appMessage && pageParameters.get("stardew") === "manual") {
  appMessage.hidden = false;
  window.history.replaceState({}, "", `${window.location.pathname}#favorites`);
}

dismissMessage?.addEventListener("click", () => {
  appMessage.hidden = true;
});
