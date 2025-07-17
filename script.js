
let display = document.querySelector(".empty_para");
let button = document.querySelector("#btn")


async function get_data() {

    let city = document.querySelector("#cities");
    let city_Name = city.value;
    let cityname_url = `https://geocoding-api.open-meteo.com/v1/search?name=${city_Name}`;

    let cityname_Data = await fetch(cityname_url);
    let data = await cityname_Data.json();



    let latitude = data.results[0].latitude;
    let longitude = data.results[0].longitude;
    



   let lat_long_url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true
   `;
   let weather_Data = await fetch(lat_long_url);
   let weather = await weather_Data.json();
    console.log(weather);
    

    let temp = weather.current_weather.temperature;
    let temp_unit = weather.current_weather_units.temperature;

    let time = weather.current_weather.time;

    let windspeed = weather.current_weather.windspeed;
    let windspeed_unit = weather.current_weather_units.windspeed;

    let winddirection = weather.current_weather.winddirection;
    let winddirection_unit = weather.current_weather_units.winddirection;
    

    function getWeatherEmoji(code) {
      if (code === 0) return "☀️ Clear sky";
      else if (code >= 1 && code <= 3) return "⛅ Partly cloudy";
      else if (code >= 45 && code <= 48) return "🌫️ Fog";
      else if (code >= 51 && code <= 57) return "🌦️ Drizzle";
      else if (code >= 61 && code <= 67) return "🌧️ Rain";
      else if (code >= 71 && code <= 77) return "❄️ Snow";
      else if (code >= 80 && code <= 82) return "🌧️ Showers";
      else if (code >= 95 && code <= 99) return "⛈️ Thunderstorm";
      else return "❓ Unknown";
    }

    let weather_code = weather.current_weather.weathercode;
    let condition = getWeatherEmoji(weather_code)

    
display.innerHTML = `
  <p>🌡️ <strong>Temperature:</strong> ${temp}${temp_unit}</p>
  <p>🕒 <strong>Time:</strong> ${time}</p>
  <p>💨 <strong>Wind Speed:</strong> ${windspeed} ${windspeed_unit}</p>
  <p>🧭 <strong>Wind Direction:</strong> ${winddirection}${winddirection_unit}</p>
  <p>🌤️ <strong>Condition:</strong> ${condition}</p>
`;




}



button.addEventListener("click", get_data);
