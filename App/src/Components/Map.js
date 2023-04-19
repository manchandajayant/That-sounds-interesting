import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Swal from "sweetalert2";
import { connectAudioNode, disconnectAudioNode } from "./webAudio";
import data from "./data.json";
const accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const Map = () => {
	const [viewport, setViewport] = useState({
		latitude: 40.47,
		longitude: 3.45,
		zoom: 1.6,
	});

	const [showPopup, togglePopup] = React.useState(false);
	const [audioTrue, setaudioTrue] = useState(false);

	const handleClick = (space) => {
		var counter = 0;
		var btnClicked = true;
		Swal.fire({
			imageUrl: space.image,
			imageHeight: 400,
			imageWidth: 400,
			imageAlt: "A tall image",
			title: space.name,
			html:
				"<div style='display:block'>" +
				'<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn"  id="btn">' +
				"<i class='fa fa-microphone fa-2x' aria-hidden='true' id='microphone'></i>" +
				"</button></div>",
			showCloseButton: true,
			showCancelButton: false,
			allowOutsideClick: false,
			focusConfirm: false,
			showConfirmButton: false,
		}).then(() => {
			if (audioTrue || btnClicked) disconnectAudioNode();
		});
		const btn = document.getElementById("btn");
		btn.onclick = () => {
			setaudioTrue(true);
			btnClicked = true;
			// This is one of the shoddiest solutions to anything ever, must improve on this.
			counter++;
			if (counter % 2 !== 0) {
				connectAudioNode(space);
				document.getElementById("microphone").style.color =
					"rgb(255,20,147,0.7)";
			} else {
				disconnectAudioNode();
				document.getElementById("microphone").style.color =
					"rgb(0,0,0,0.7)";
			}
		};
	};

	return (
		<div className="map-container">
			<ReactMapGL
				{...viewport}
				height={"100vh"}
				width={"100vw"}
				mapboxAccessToken={accessToken}
				mapStyle={`mapbox://styles/jayantmanchanda/ckynbop6g56nw14l2m5r2t7bd?access_token=${accessToken}`}
				onViewportChange={(nextViewport) => setViewport(nextViewport)}
			>
				{" "}
				{data.map((space, i) => {
					return (
						<div
							key={i}
							data-toggle="tooltip"
							data-placement="top"
							title={space.name}
						>
							<Marker
								latitude={space.lat}
								longitude={space.lng}
								offsetLeft={-7}
								offsetTop={-20}
								captureClick={true}
								onClick={() => handleClick(space)}
							>
								<i className="fas fa-circle" id="marker"></i>
							</Marker>
						</div>
					);
				})}
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
