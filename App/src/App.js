import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Homepage from './Components/Homepage';
import Navbar from './Components/Navbar';
// import Login from './Components/Login';
// import AddAPlace from './Components/AddAndUpload/AddAPlace';
import About from './Components/About';

import './App.css';


function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Homepage />} />
				<Route exact path="/about" element={<About/>}/>
				{/* <Route exact path="/login" element={<Login />} /> */}
				{/* <Route exact path="/add" element={<AddAPlace />} /> */}
			</Routes>
		</div>
	);
}

export default App;
