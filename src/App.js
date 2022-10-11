import React from 'react';
import axios from 'axios'
import './App.css'
import Playlist from "./Playlist.js"
import {getWeather, getBackgroundVideo, getCity} from "./weatherFunctions"
import { loginEndpoint, searchPlaylists, getRandomPlaylist, checkIsLoggedIn } from './spotifyFunctions'
import SunSpinner from './SunSpinner.js'

class App extends React.Component {
	state = {
		weather: '',
		longitude: 0,
		latitude: 0,
		temp: 0,
		feelsLike: 0,
		humidity: 0,
		windspeed: 0,
		playlistID: "",
		loggedIn: null,
		video: null,
		city: '',
		locality: '',
		country: ''
	}

	// Makes stuff happen
	componentDidMount() {
	    if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition((position) => {
					console.log(position)
					console.log("Latitude is :", position.coords.latitude)
		      console.log("Longitude is :", position.coords.longitude)
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					})

					this.loadPage()
	    	})
	    } else {
	      console.log("Not Available");
	    }
	  }

	async loadPage() {
			// WEATHER
	  	let currentWeather = await getWeather(this.state.latitude, this.state.longitude)

			let currentCity = await getCity(this.state.latitude, this.state.longitude)

			this.setState({
				weather: currentWeather.weather,
				temp: Math.floor(currentWeather.temp),
				feelsLike: Math.floor(currentWeather.feelsLike),
				humidity: currentWeather.humidity,
				windspeed: Math.floor(currentWeather.windspeed),
				video: await getBackgroundVideo(currentWeather.weather),
				city: currentCity.city,
				locality: currentCity.locality,
				country: currentCity.country
			})


			// SPOTIFY
			// is the user logged in to Spotify? ...
			let loggedIn = checkIsLoggedIn()
			this.setState({
				loggedIn: loggedIn
			})

			// console.log("This is the weather", JSON.stringify(currentWeather, null, 2))

			// Conditionals to make the search results better
			if (currentWeather.weather === 'Thunderstorm') {
				currentWeather.weather = 'Stormy'
			}
			if (currentWeather.weather === 'Drizzle') {
				currentWeather.weather = 'Rainy'
			}
			if (currentWeather.weather === 'Rain') {
				currentWeather.weather = 'Rainy'
			}
			if (currentWeather.weather === 'Snow') {
				currentWeather.weather = 'Snowy'
			}
			if (currentWeather.weather === 'Clear') {
				currentWeather.weather = 'Sunny'
			}
			if (currentWeather.weather === 'Clouds') {
				currentWeather.weather = 'Cloudy'
			}

			if (loggedIn) {
					let spotifyData = await searchPlaylists(currentWeather.weather)
				//
				// console.log(playlists)
				//
			  let playlistID = await getRandomPlaylist(spotifyData)
				this.setState({
					playlistID: playlistID
				})
			}
}


	render() {
		console.log(this.state.loggedIn);
		return (
			<div className="app">
			{this.state.video && (
				<video autoPlay loop muted id='video'>
					<source src={this.state.video} type="video/mp4" />
				</video>
			)}
				<div className="container">
					<div className="top">
						<div>
						<div className="location">
							<p>Current Weather Conditions in {this.state.city || this.state.locality}, {this.state.country}</p>
						</div>
						<div className="temp">
							<h1>{this.state.temp}°C</h1>
						</div>
						</div>
						<div>
						<div className="description bold">
							{this.state.weather}
						</div>
						</div>
					</div>

					<>
					{this.state.loggedIn === false && <div className="divspotify">
						<a href= { loginEndpoint }><button className="spotify"> Connect to Spotify</button></a>
					</div>}

					{this.state.loggedIn && (
						<div className="grid">
						<div>
							{this.state.playlistID && (
								<iframe
					        title="Spotify Web Player"
					        src={`https://open.spotify.com/embed/playlist/${this.state.playlistID}`}
					        width={'100%'}
					        height={'300'}
					        frameBorder={0}
					        allow={'true'}
					      />
							)}

							{!this.state.playlistID && (
								<SunSpinner />
							)}

						</div>
						</div>
					)
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
							<p className="bold">{this.state.windspeed} m/s</p>
							<p>Wind Speed</p>
						</div>
					</div>
				</div>
			</div>
	)
	}
}

export default App;
