import React, { useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiamF5YW50bWFuY2hhbmRhIiwiYSI6ImNreW5iaW92ZTJmZzAycHAwMTl5bXgxZWYifQ.tZt6Ln6-L_VPGLLzFp2umg';

const INITIAL_VIEW_STATE = {
	latitude: 51.47,
	longitude: 0.45,
	zoom: 1,
	bearing: 0,
	pitch: 30,
};

const Map = () => {
	const mapContainerRef = useRef(null);
	const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  
	// Initialize map when component mounts
	useEffect(() => {
	  const map = new mapboxgl.Map({
		container: mapContainerRef.current,
		style: 'mapbox://styles/jayantmanchanda/ckynbop6g56nw14l2m5r2t7bd',
		center: [51.47, 0.45],
		zoom: 1.5
	  });
  
	  // Clean up on unmount
	  return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
  
	return (
	  <div>
		<div className='map-container' ref={mapContainerRef} />
	  </div>
	);
  };
  
  export default Map;