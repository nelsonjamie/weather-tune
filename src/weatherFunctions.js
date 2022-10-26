import axios from 'axios'


export const getCity = async (a, b) => {
	console.log("getting city...")

	let reverseGeo = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`)
	console.log(JSON.stringify(reverseGeo.data, null, 2))


	return {
		// city: reverseGeo.data.city,
		usState: reverseGeo.data.principalSubdivision,
		locality: reverseGeo.data.locality,
		country: reverseGeo.data.countryName
	}
}



//Gets the current weather (pass results of getlocation)
export const getWeather = async (a, b) => {
	console.log("getting weather...")

	let openweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&units=imperial&appid=7217d8925634726c87adcf087ea90583`)
	console.log(JSON.stringify(openweather.data, null, 2))

	return {
		weather: openweather.data.weather[0].main,
		temp: Math.floor(openweather.data.main.temp),
		feelsLike: Math.floor(openweather.data.main.feels_like),
		humidity: openweather.data.main.humidity,
		windspeed: Math.floor(openweather.data.wind.speed),
		city: openweather.data.name
	}
}



export const getBackgroundVideo = async (weather) => {
	if (weather === "Clouds") {
		 return "https://res.cloudinary.com/djxvdruvu/video/upload/v1664964636/weather-music/clouds-day.mp4"
	}
	else if
		(weather === "Thunderstorm") {
			return "https://res.cloudinary.com/djxvdruvu/video/upload/v1664966149/weather-music/thunderstorm.mp4"
	} else if
		(weather === "Drizzle") {
			return "https://res.cloudinary.com/djxvdruvu/video/upload/v1664964629/weather-music/drizzle.mp4"
	} else if
		(weather === "Rain") {
			return "https://res.cloudinary.com/djxvdruvu/video/upload/v1664964633/weather-music/rain.mp4"
	} else if
		(weather === "Snow") {
			return "https://res.cloudinary.com/djxvdruvu/video/upload/v1664964638/weather-music/snow.mp4"
	} else if
		(weather === "Clear") {
			return "https://res.cloudinary.com/djxvdruvu/video/upload/v1664963088/weather-music/sunny.mp4"
	}
	else {
		 return "https://res.cloudinary.com/djxvdruvu/video/upload/v1664964639/weather-music/clear-night.mp4"
	}
}
