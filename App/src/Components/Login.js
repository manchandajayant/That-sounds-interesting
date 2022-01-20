import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
function Login() {
	const navigate = useNavigate()
	useEffect(() => {
		Swal.fire({
			title: 'Login',
			html:
				'<p>Email</p>' +
				'<input id="swal-input1" class="swal2-input">' +
				'<p>Password</p>' +
				'<input id="swal-input2" class="swal2-input">',
			focusConfirm: false,
			showCancelButton: false,
			confirmButtonText: 'Login',
			showLoaderOnConfirm: true,
			preConfirm: (login) => {
				return [
					document.getElementById('swal-input1').value,
					document.getElementById('swal-input2').value
				],
					fetch(`https://api.github.com/users/${login}`)
						.then(response => {
							if (!response.ok) {
								throw new Error(response.statusText)
							}
							return response.json()
						})
						.catch(error => {
							Swal.showValidationMessage(
								`Request failed: ${error}`
							)
						})
			},
			allowOutsideClick: () => {
				return navigate('/'), !Swal.isLoading()
			}
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: `${result.value.login}'s avatar`,
					imageUrl: result.value.avatar_url
				})
			}
		})
	}, [])
	return (
		<div style={{ zIndex: '1' }} className="col-3 ms-3">

		</div>
	);
}

export default Login;
