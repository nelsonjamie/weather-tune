import axios from 'axios'
import { getRandomPlaylist } from "./spotifyFunctions.js"

//Gets the current weather (pass results of getlocation)
const getWeather = async (a, b) => {
	console.log("getting weather...")

	let openweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&units=metric&appid=7217d8925634726c87adcf087ea90583`)
	// console.log(JSON.stringify(openweather.data, null, 2))

	return {
		weather: openweather.data.weather[0].main,
		temp: Math.floor(openweather.data.main.temp),
		feelsLike: Math.floor(openweather.data.main.feels_like),
		humidity: openweather.data.main.humidity,
		windspeed: Math.floor(openweather.data.wind.speed)
	}

	// this.getRandomPlaylist(openweather.data.weather[0].main)
}

// getBackgroundVideo = () => {
// 	if this.state.weather == "clouds" return "https://asset.cloudinary.com/djxvdruvu/41bbc3f896a0d3ceff205ecad4273ab6"
// }

export {getWeather}
