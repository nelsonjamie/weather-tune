//for Spotify Api
const CLIENT_ID = '874bc4727f4046dfb6ace3b47584305f'
	const REDIRECT_URI = 'http://localhost:3000/'
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
	const RESPONSE_TYPE = 'token'

export const loginEndpoint = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

console.log({ loginEndpoint });
