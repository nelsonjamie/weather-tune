//for Spotify Api
import axios from 'axios'

const CLIENT_ID = '874bc4727f4046dfb6ace3b47584305f'
const REDIRECT_URI = 'http://localhost:3000/'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'


export const loginEndpoint = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

console.log({ loginEndpoint });


export const searchPlaylist = async (token, query) => {
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
export const getRandomPlaylist = async (a) => {
	console.log("getting random playlist...");

// Returns the token from the url and using the substring and split it separates the token from the "#access_token"
const params = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
const token = window.location.hash.substring(1).split("=")[1]

	let spotifyData = []

	// when user connects and is authorized you can receive a token and search for a playlist
	if (token) {
		spotifyData = await searchPlaylist(token, a)
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

export default { loginEndpoint, searchPlaylist, getRandomPlaylist }
