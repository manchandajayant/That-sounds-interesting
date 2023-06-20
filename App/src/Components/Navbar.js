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
                            text: "By interacting with a map, you can explore various locations marked by pink dots. Simply click on a dot, and a popup will appear, providing details about that specific place. If you wish to immerse yourself further, click on the microphone icon. Your browser will prompt you to grant microphone permissions, enabling you to hear your own voice within the selected location. For optimal experience, remember to use headphones to prevent any audio feedback loops.",
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
