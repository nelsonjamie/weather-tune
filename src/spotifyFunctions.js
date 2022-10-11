//for Spotify Api
import axios from 'axios'

const CLIENT_ID = '874bc4727f4046dfb6ace3b47584305f'
const REDIRECT_URI = 'http://localhost:3000/'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'

// const params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
const token = window.location.hash.substring(1).split("=")[1]

export const checkIsLoggedIn = () => {
	return token !== undefined
}

export const loginEndpoint = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

console.log({ loginEndpoint });


export const searchPlaylists = async (query) => {
	const ENDPOINT = 'https://api.spotify.com/v1/search?q='+ query+'&type=playlist&include_external=audio&limit=50'

		let data = await axios.get(ENDPOINT, {
			headers: {
				Authorization: 'Bearer ' + token ,
				"Content-Type": "application/json"

			}
		})

		console.log(data);
	 	return data;
}

// for the Spotify Api

// function that gives me a random playlist from the array that the spotify api returns
export const getRandomPlaylist = async (spotifyData) => {

	//setting the playlist items to a variable
	let resultPlaylists = spotifyData.data.playlists.items;

	// here we are looping through the results/items anc choosing a random playlist
	let randomPlaylist = resultPlaylists[Math.floor(Math.random() * resultPlaylists.length)].id;

	console.log(randomPlaylist);

	return randomPlaylist
}
