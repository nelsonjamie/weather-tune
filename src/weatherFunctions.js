import axios from 'axios'



//Gets the user's current location (lat and Long)
export const getLocation = () => {
	if ("geolocation" in navigator) {
		console.log("Available")
		navigator.geolocation.getCurrentPosition((position) => {
			console.log("Latitude is :", position.coords.latitude)
			console.log("Longitude is :", position.coords.longitude)
			this.setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			})
			console.log(this.props.latitude)
			return
		})
	} else {
		console.log("Not Available");
	}

}
