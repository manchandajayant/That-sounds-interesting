import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../Constants/constants";
import { invokeSwal } from "../../helpers/swal";

const Navbar: React.FC = (): ReactElement => (
    <div className="nav">
        <div className="text-heading-nav">
            <h1>
                <Link to="/">SOUNDS INTERESTING</Link>
            </h1>
        </div>
        <div className="text-add-place">
            <p onClick={() => invokeSwal(CONSTANTS.info)}>Add a sound / place</p>
            {/* <p>Your sounds</p> */}
            <p onClick={() => invokeSwal(CONSTANTS.process)}>What should i do ?</p>
            <p>
                <Link to="/about">About</Link>
            </p>
        </div>
    </div>
);

export default Navbar;
