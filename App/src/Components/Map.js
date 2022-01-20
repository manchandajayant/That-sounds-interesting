import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const Map = () => {
	const [viewport, setViewport] = useState({
		latitude: 51.47,
		longitude: 0.45,
		zoom: 1,
	});

	return (
		<div className="map-container">
			<ReactMapGL
				{...viewport}
				height={"100vh"}
				width={"100vw"}
				mapboxApiAccessToken={accessToken}
				mapStyle="mapbox://styles/jayantmanchanda/ckynbop6g56nw14l2m5r2t7bd"
				onViewportChange={(nextViewport) => setViewport(nextViewport)}
			/>
		</div>
	);
};

export default Map;
