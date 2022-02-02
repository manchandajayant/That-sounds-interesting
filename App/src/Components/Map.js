import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Swal from "sweetalert2";
import { connectAudioNode, disconnectAudioNode } from "./webAudio";

const accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const Map = () => {
	const [viewport, setViewport] = useState({
		latitude: 51.47,
		longitude: 0.45,
		zoom: 1.7,
	});

	const [showPopup, togglePopup] = React.useState(false);
	const [audioTrue, setaudioTrue] = useState(false);
	const handleClick = () => {
		var counter = 0;
		Swal.fire({
			title: "Space Name",
			html:
				"<div style='display:block'><img alt='null' src='https://www.maeshowe.co.uk/images/maeshowefisheyeint204p.jpg' height='150px' width='150px'/>" + 
				'<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn"  id="btn">' +
				"Microphone" +
				"</button></div>",
			showCloseButton: true,
			showCancelButton: false,
			allowOutsideClick: false,
			focusConfirm: false,
		}).then((value) => {
			if (audioTrue) disconnectAudioNode();
		});
		const btn = document.getElementById("btn");
		btn.onclick = (e) => {
			setaudioTrue(true);
			// This is one of the shoddiest solutions to anything ever, must improve on this.
			counter++;
			if (counter % 2 !== 0) {
				connectAudioNode();
			} else {
				disconnectAudioNode();
			}
		};
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
