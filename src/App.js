import React from 'react';
import axios from 'axios'
import { loginEndpoint, searchPlaylist } from './spotify'
import Button from 'react-bootstrap/Button'
import './App.css'



class App extends React.Component {
	state = {
		weather: 'sunny',
		longitude: 0,
		latitude: 0,
		temp: 0,
		feelsLike: 100,
		humidity: 55,
		windspeed: 2,
		playlistID: "",
		loggedIn: false
	}


	// for Weather Api
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
		// for the Spotify Api

		// function that gives me a random playlist from the array that the spotify api returns
		getRandomPlaylist = async (weather) => {
			console.log("getting random playlist...");

		// Returns the token from the url and using the substring and split it separates the token from the "#access_token"
		const params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
		const token = window.location.hash.substring(1).split("=")[1]

			let spotifyData = []

			// when user connects and is authorized you can receive a token and search for a playlist
			if (token) {
				spotifyData = await searchPlaylist(token, weather)
				this.setState({
					loggedIn: true
				})
			} else {
				console.log("Invalid token");
			}
			console.log("spotify data: ");
			console.log(spotifyData);

			//setting the playlist items to a variable
			let resultPlaylists = spotifyData.data.playlists.items;
			console.log("resultPlaylists");
			console.log(resultPlaylists);

			// here we are looping through the results/items anc choosing a random playlist
			let randomPlaylist = resultPlaylists[Math.floor(Math.random() * resultPlaylists.length)].id;

			console.log("the random playlist is...");
			console.log(randomPlaylist);

			this.setState( {
				playlistID: randomPlaylist
			})

			return randomPlaylist
}

	getWeather = async () => {
			console.log("getting weather...");

		let openweather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&appid=7217d8925634726c87adcf087ea90583`)
		// console.log(JSON.stringify(openweather.data, null, 2))

		this.setState({
			weather: openweather.data.weather[0].main,
			temp: Math.floor(openweather.data.main.temp),
			feelsLike: Math.floor(openweather.data.main.feels_like),
			humidity: openweather.data.main.humidity,
			windspeed: Math.floor(openweather.data.wind.speed)
		})

		this.getRandomPlaylist(openweather.data.weather[0].main)
	}

	// getBackgroundVideo = () => {
	// 	if this.state.weather == "clouds" return "https://asset.cloudinary.com/djxvdruvu/41bbc3f896a0d3ceff205ecad4273ab6"
	// }



	render() {
		return (
			<div className="app">
				<video autoPlay loop muted id='video'>
					<source src="https://res.cloudinary.com/djxvdruvu/video/upload/v1664963088/weather-music/sunny.mp4" type="video/mp4" />
				</video>
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
					{this.state.loggedIn == false ? <div>
						<a href= { loginEndpoint }><button className="spotify"> Connect to Spotify</button></a>
					</div> : <div className="grid">
					<div>
						<iframe
					        title="Spotify Web Player"
					        src={`https://open.spotify.com/embed/playlist/${this.state.playlistID}`}
					        width={'300%'}
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
							<p className='bold'>{this.state.feelsLike}°C</p>
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
