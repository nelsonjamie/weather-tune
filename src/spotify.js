//for Spotify Api
import axios from 'axios'

const CLIENT_ID = '874bc4727f4046dfb6ace3b47584305f'
const REDIRECT_URI = 'http://localhost:3000/'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'


export const loginEndpoint = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

console.log({ loginEndpoint });


export const searchPlaylist = async (token, query) => {
const ENDPOINT = 'https://api.spotify.com/v1/search?q='+ query+'&type=playlist&include_external=audio&limit=5'

	let data = await axios.get(ENDPOINT, {
		headers: {
			Authorization: 'Bearer ' + token ,
			"Content-Type": "application/json"

		}
	})

	console.log(data);
}
