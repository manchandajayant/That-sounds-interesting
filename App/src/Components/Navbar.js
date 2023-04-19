import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Navbar() {
	return (
		<div className="nav">
			<div className="text-heading-nav">
				<h1><Link to="/">SOUNDS INTERESTING</Link></h1>
			</div>
			<div className="text-add-place">
				<p
					onClick={() => {
						Swal.fire({
							icon: "info",
							text: "I am currently working on setting up a process for this",
						});
					}}
				>
					Add a sound / place
				</p>
				{/* <p>Your sounds</p> */}
				<p>
					<Link to="/about">About</Link>
				</p>
			</div>
		</div>
	);
}
