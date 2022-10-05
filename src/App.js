import React from 'react';
import axios from 'axios'
import { loginEndpoint, searchPlaylist } from './spotify'
import Button from 'react-bootstrap/Button'
import './App.css';


class App extends React.Component {
	state = {
		weather: 'sunny',
		longitude: 0,
		latitude: 0,
		temp: 0,
		feelsLike: 100,
		humidity: 55,
		windspeed: 2,
		loggedIn: false
	}


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
		let openweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&appid=7217d8925634726c87adcf087ea90583`)
		// console.log(JSON.stringify(openweather.data, null, 2))

		this.setState({
			weather: openweather.data.weather[0].main,
			temp: Math.floor(openweather.data.main.temp),
			feelsLike: Math.floor(openweather.data.main.feels_like),
			humidity: openweather.data.main.humidity,
			windspeed: Math.floor(openweather.data.wind.speed)
		})

		const params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
		const token = window.location.hash.substring(1).split("=")[1]

		if (token) {
			searchPlaylist(token, this.state.weather)
			this.setState({
				loggedIn: true
			})
			console.log(token)
		} else {
			console.log("noooo");
		}
	}


	render() {
		return (
			<div className="app">
				<div className="container">
					<div className="top">
						<div className="location">
							<p>Current Weather Conditions</p>
						</div>
						<div className="temp">
							<h1>{this.state.temp}°C</h1>
						</div>
						<div className="description">
							<p>{this.state.weather}</p>
						</div>
					</div>

					<>
					{this.state.loggedIn == false ? <div >
						<a href= { loginEndpoint }><button className="spotify"> Connect to Spotify</button></a>
					</div> : <div className="grid">
					<div>
						<iframe
					        title="Spotify Web Player"
					        src={`https://open.spotify.com/embed/playlist/0iGIfxwsyhMHZ3GMXgW3MH?si=f024c3aa52294aa1`}
					        width={'95%'}
					        height={'300'}
					        frameBorder={0}
					        allow={true}
					      />
					</div>
					<div>
						<iframe
					        title="Spotify Web Player"
					        src={`https://open.spotify.com/embed/playlist/37i9dQZF1DX1BzILRveYHb`}
					        width={'95%'}
					        height={'300'}
					        frameBorder={0}
					        allow={true}
					      />
					</div>
					<div>
						<iframe
					        title="Spotify Web Player"
					        src={`https://open.spotify.com/embed/playlist/2L7ITJDRWIVNkxNq8qhI30`}
					        width={'95%'}
					        height={'300'}
					        frameBorder={0}
					        allow={true}
					      />
					</div>
				</div>
			 }
			 </>




					<div className="bottom">
						<div className="feels">
							<p className='bold'>{this.state.feelsLike}℃</p>
							<p>Feels like</p>
						</div>
						<div className="humidity">
							<p className='bold'>{this.state.humidity}%</p>
							<p>Humidity</p>
						</div>
						<div className="wind">
							<p>{this.state.windspeed} m/s</p>
							<p>Wind Speed</p>
						</div>
					</div>
				</div>
			</div>
	)
	}
}

export default App;
