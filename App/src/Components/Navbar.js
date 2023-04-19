import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Navbar() {
    return (
        <div className="nav">
            <div className="text-heading-nav">
                <h1>
                    <Link to="/">SOUNDS INTERESTING</Link>
                </h1>
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
                <p
                    onClick={() => {
                        Swal.fire({
                            icon: "What should i do ?",
                            text: "Click on any pink dot on the map denoting a location, it will open a popup with the selected space. Click on the microphone icon, the browser will ask you for microphone permissions, Once you allow it, you will be able to hear yourself in the selected space. Remember to use headphones to not create a feedback loop",
                        });
                    }}
                >
                    What should i do ?
                </p>
                <p>
                    <Link to="/about">About</Link>
                </p>
            </div>
        </div>
    );
}
