import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
	return (
		<div className="nav">
			<div className="text-heading-nav">
				<h1>THAT SOUNDS INTERESTING</h1>
			</div>
			<div className="text-add-place">
				<p>
					<Link to={'/add'}>Add a sound / place</Link>
				</p>
				<p>Your sounds</p>
				<p>About</p>
			</div>
		</div>
	);
}
