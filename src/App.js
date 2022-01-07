import React from 'react';
import Homepage from './Components/Homepage';
import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import AddAPlace from './Components/AddAPlace';
import { Route, Routes } from 'react-router-dom';
function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Homepage />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/add" element={<AddAPlace />} />
			</Routes>
		</div>
	);
}

export default App;
