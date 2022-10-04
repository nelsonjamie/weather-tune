import React from 'react';
import axios from 'axios'
import './App.css';


class App extends React.Component {
	state = {
		weather: 'sunny',
		longitude: 0,
		latitude: 0,
		temp: 0,
		feelsLike: 0,
		humidity: 0,
		windspeed: 0
	}

	// //for Spotify Api
	// const CLIENT_ID = '874bc4727f4046dfb6ace3b47584305f'
	// const REDIRECT_URI = 'http://localhost:3000/'
	// const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
	// const RESPONSE_TYPE = 'token'

	// for Weather Api
	// const url = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=a8bb6300ed41f0f14aca082acab36629'

	componentDidMount() {
	    if ("geolocation" in navigator) {
	      console.log("Available")
				navigator.geolocation.getCurrentPosition((position) => {
					console.log("Latitude is :", position.coords.latitude)
		      console.log("Longitude is :", position.coords.longitude)
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					})
					console.log(this.state.latitude)
					this.getWeather()
	    	})
	    } else {
	      console.log("Not Available");
	    }
	  }


	getWeather = async () => {
		let openweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=7217d8925634726c87adcf087ea90583`)
		console.log(JSON.stringify(openweather.data.weather[0].main, null, 2))


		this.setState({
			weather: openweather.data.weather[0].main
		})
	}


	render() {
		return (
			<div className="app">
				<div className="container">
					<div className="top">
						<div className="location">
							<p>Stockholm</p>
						</div>
						<div className="temp">
							<h1>40℃</h1>
						</div>
						<div className="description">
							<p>{this.state.weather}</p>
						</div>
					</div>
					<div className="bottom">
						<div className="feels">
							<p className='bold'>30℃</p>
							<p>Feels like</p>
						</div>
						<div className="humidity">
							<p className='bold'>10%</p>
							<p>Humidity</p>
						</div>
						<div className="wind">
							<p>5 MPH</p>
							<p>Wind Speed</p>
						</div>
					</div>
				</div>
			</div>

	)
	}

}

export default App;
