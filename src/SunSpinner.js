import React from 'react'

class SunSpinner extends React.Component {

	render() {
		return (
			<>
				<div>
	    		<div className="circle"></div>
	    		<div className="innerCircle"></div>
				</div>

				<div className="spinner">
			    <div className="bar"></div>
			    <div className="bar"></div>
			    <div className="bar"></div>
			    <div className="bar"></div>
			    <div className="bar"></div>
			    <div className="bar"></div>
			    <div className="bar"></div>
			    <div className="bar"></div>
			    <div className="bar"></div>
				</div>
		 </>
		)
	}
}

export default SunSpinner
