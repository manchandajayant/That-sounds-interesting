import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Login() {
	return (
		<div style={{ zIndex: '1' }} className="col-3 ms-3">
			{/* <Popup trigger={<button> Trigger</button>} position="right center">
				<div>Popup content here !!</div>
			</Popup> */}

			<input type="email" className="form-control" id="inputPassword2" placeholder="email" />
		</div>
	);
}

export default Login;
