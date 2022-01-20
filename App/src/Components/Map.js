import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Swal from 'sweetalert2';
const accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const Map = () => {
	const [viewport, setViewport] = useState({
		latitude: 51.47,
		longitude: 0.45,
		zoom: 1,
	});
	const [showPopup, togglePopup] = React.useState(false);
	const handleClick = () => {
		Swal.fire({
			title: '<strong>HTML <u>example</u></strong>',
			icon: 'info',
			html:
			  'You can use <b>bold text</b>, ' +
			  '<a href="//sweetalert2.github.io">links</a> ' +
			  'and other HTML tags',
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false,
			confirmButtonText:
			  '<i class="fa fa-thumbs-up"></i> Great!',
			confirmButtonAriaLabel: 'Thumbs up, great!',
			cancelButtonText:
			  '<i class="fa fa-thumbs-down"></i>',
			cancelButtonAriaLabel: 'Thumbs down'
		  })
	};

	return (
		<div className="map-container">
			<ReactMapGL
				{...viewport}
				
				height={"100vh"}
				width={"100vw"}
				mapboxApiAccessToken={accessToken}
				mapStyle="mapbox://styles/jayantmanchanda/ckynbop6g56nw14l2m5r2t7bd"
				onViewportChange={(nextViewport) => setViewport(nextViewport)}
			>
				{" "}
				<Marker
					latitude={37.78}
					longitude={-77.41}
					offsetLeft={-7}
					offsetTop={-20}
					captureClick={true}
					onClick={handleClick}
				>
					<i className="fas fa-circle" id="marker"></i>
				</Marker>
				{showPopup && (
					<Popup
						latitude={37.78}
						longitude={-77.41}
						closeButton={true}
						closeOnClick={false}
						onClose={() => togglePopup(false)}
						anchor="top"
						dynamicPosition={false}
					>
						<div>You are here</div>
					</Popup>
				)}
			</ReactMapGL>
		</div>
	);
};

export default Map;
