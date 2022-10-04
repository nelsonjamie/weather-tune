import React from 'react';
import axios from 'axios'
import './App.css';


function App() {
	//for Spotify Api
	const CLIENT_ID = '874bc4727f4046dfb6ace3b47584305f'
	const REDIRECT_URI = 'http://localhost:3000/'
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
	const RESPONSE_TYPE = 'token'

	// for Weather Api
	// const url = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=a8bb6300ed41f0f14aca082acab36629'


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
					<a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Connect to Spotify</a>
				</div>
			</div>
    </div>
  );
}

export default App;
