import React from 'react';
import axios from 'axios'
import { loginEndpoint } from './spotify'
import './App.css';


class App extends React.Component {
	state = {
		userLoc: 'Tucson',
		weather: 'sunny',
		longitude: '0',
		latitude: '0',
		LocKey: '438540'
	}


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
	    	})
	    } else {
	      console.log("Not Available");
	    }
	  }

	// 	getLocKey = async (latitude, longitude) => {
	// 		let LocKey = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search')
	// 		console.log(LocKey)
	// 	}
	//
	// getWeather = async () => {
	// 	let weather = await axios.get('http://dataservice.accuweather.com/currentconditions/v1/')
	// 	console.log(weather)
	// 	return weather
	// }


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
							<p>Clouds</p>
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
						<div className="spotify">
							<a href= { loginEndpoint }><div>Connect to Spotify</div></a>
						</div>
					</div>
				</div>
			</div>

	)
	}
}

export default App;
