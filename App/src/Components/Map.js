import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Swal from "sweetalert2";
const accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const Map = () => {
	const [viewport, setViewport] = useState({
		latitude: 51.47,
		longitude: 0.45,
		zoom: 1.7,
	});

	useEffect(() => {
		function onBtnClicked() {
			console.log("e");
		}
	}, []);

	const onBtnClicked = () => {
		console.log("d");
	};

	const [showPopup, togglePopup] = React.useState(false);
	const handleClick = () => {
		Swal.fire(
			{
				title: "Space Name",
				html:
					"You can use <b>bold text</b>, " +
					'<a href="//sweetalert2.github.io">links</a> ' +
					"and other HTML tags" +
					'<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn"  id="btn">' +
					"Button1" +
					"</button>",
				showCloseButton: true,
				showCancelButton: false,
				allowOutsideClick: false,
				focusConfirm: false,
			}
		).then((value) => {
			console.log(value);
		});
		const btn = document.getElementById("btn");
		btn.onclick = (e) => {
			console.log(e);
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
