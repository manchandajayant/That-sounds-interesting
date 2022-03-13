import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
// import Login from './Components/Login';
// import AddAPlace from './Components/AddAndUpload/AddAPlace';
import About from './Components/About';

import './App.css';


function App() {

	const [isMobile, setIsMobile] = useState(false)

	//choose the screen size 
	const handleResize = () => {
		if (window.innerWidth < 720) {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}
	}

	// create an event listener
	useEffect(() => {
		window.addEventListener("resize", handleResize)
	})


	if (isMobile) {
		return <div className="App">
			<div style={{marginTop:"50%"}}>This only works on the web right now</div>
		</div>
	} else {
		return (
			<div className="App">
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Homepage />} />
					<Route exact path="/about" element={<About />} />
					{/* <Route exact path="/login" element={<Login />} /> */}
					{/* <Route exact path="/add" element={<AddAPlace />} /> */}
				</Routes>
			</div>

		)

	}




	// {isMobile}{
	// return (
	// 	<div className="App">

	// 			<div>This only works on web right now</div>
	// </div>
	// )} else {
	// 	return (

	// 				<div className="App">
	// 		<Navbar />
	// 		<Routes>
	// 			<Route exact path="/" element={<Homepage />} />
	// 			<Route exact path="/about" element={<About />} />
	// 			{/* <Route exact path="/login" element={<Login />} /> */}
	// 			{/* <Route exact path="/add" element={<AddAPlace />} /> */}
	// 		</Routes>
	// 	</div>

	// 	)
	// }
	// );
}

export default App;
