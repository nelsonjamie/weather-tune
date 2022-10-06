import React from 'react';
import axios from 'axios'
import './App.css'
import Weather from "./Weather.js"
import Playlist from "./Playlist.js"
import {getWeather} from "./weatherFunctions"
import spotifyFunctions from "./spotifyFunctions"
import { loginEndpoint, searchPlaylist, getRandomPlaylist } from './spotifyFunctions'

class App extends React.Component {
	state = {
		weather: 'sunny',
		longitude: 0,
		latitude: 0,
		temp: 0,
		feelsLike: 1000,
		humidity: 55555,
		windspeed: 2222,
		playlistID: "",
		loggedIn: false
	}

	// Makes stuff happen
	componentDidMount() {
	    if ("geolocation" in navigator) {
	      console.log("User")
				navigator.geolocation.getCurrentPosition((position) => {
					console.log("Latitude is :", position.coords.latitude)
		      console.log("Longitude is :", position.coords.longitude)
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					})
					console.log(this.state.latitude)
					this.runPage()
	    	})
	    } else {
	      console.log("Not Available");
	    }
	  }

	async runPage() {
	  	let currentWeather = await getWeather(this.state.latitude, this.state.longitude)
			console.log("This is the weather", JSON.stringify(currentWeather, null, 2))

			// let playlists = await spotifyFunctions.getPlaylists(currentWeather.weather)
			//
			// console.log(playlists)
			//
			// let playlist = spotifyFunctions.getRandomPlaylist(playlists)


		this.setState({
			weather: currentWeather.weather,
			temp: Math.floor(currentWeather.temp),
			feelsLike: Math.floor(currentWeather.feelsLike),
			humidity: currentWeather.humidity,
			windspeed: Math.floor(currentWeather.windspeed),
			loggedIn: "true"
		}
		)
}


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
