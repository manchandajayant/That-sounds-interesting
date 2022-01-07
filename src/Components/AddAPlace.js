import React, { useState, useEffect } from 'react';

export default function AddAPlace() {
	const [ query, setquery ] = useState('maeshowe');
	const [ setPlace, setsetPlace ] = useState('');
	const [ placeTrue, setplaceTrue ] = useState(true);
	const [ image, setImage ] = useState(
		'https://image.architonic.com/pro2-3/20167265/acoustic-art-by-nature-earth-08-pro-g-arcit18.jpg'
	);
	const [ setAudio, setsetAudio ] = useState({});
	const [ imageValidated, setimageValidated ] = useState(true);
	const [ imageTrue, setimageTrue ] = useState(false);
	const [ audioValidated, setaudioValidated ] = useState(true);

	// useEffect(async () => {
	// 	const fetchData = await fetch(
	// 		`http://api.positionstack.com/v1/forward?access_key=${process.env
	// 			.REACT_APP_POSITION_STACK_KEY}&query=${query}`
	// 	);
	//     const decodedData = await fetchData.json()
	//     console.log(decodedData)
	// }, []);

	const checkAndSelectImage = (e) => {
		if (e.target.files && e.target.files[0]) {
			if (!e.target.files[0].name.match(/.(jpg|jpeg|png)$/i)) {
				e.target.value = null;
				setimageValidated(false);
			} else {
				setImage(URL.createObjectURL(e.target.files[0]));
			}
		}
	};

	const checkAndSelectAudio = (e) => {
		if (e.target.files && e.target.files[0]) {
			if (!e.target.files[0].name.match(/.(mp3|wav)$/i)) {
				e.target.value = null;
				setaudioValidated(false);
			} else {
				setImage(URL.createObjectURL(e.target.files[0]));
			}
		}
	};
	return (
		<div
			className={`col-12 d-flex justify-content-center ${!placeTrue ? 'pt-5' : 'pt-0'}`}
			id={!placeTrue ? 'div-add-place' : ' div-add-place-file-selected'}
		>
			{!placeTrue && (
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Search by text or co-ordinates..."
						aria-label="Search for a place..."
						aria-describedby="button-addon2"
					/>
					<button className="btn btn-outline-secondary" type="button" id="button-addon2">
						Search
					</button>

					<button className="btn btn-outline-primary">Next</button>
				</div>
			)}
			{placeTrue && !imageTrue ? (
				<div>
					<p className="h3">Add an Image</p>
					<div className="d-flex justify-content-between pt-5">
						<img src={image} className="rounded" width="300px" height="300px" alt="None" />
						<div className="d-block ps-5" id="input-group">
							<label className="form-label" htmlFor="customFile">
								<p className="lead"> Upload a file</p>
							</label>
							<input
								type="file"
								className="form-control"
								onChange={checkAndSelectImage}
								onClick={(e) => (e.target.value = null)}
							/>
							{!imageValidated && (
								<div
									className="alert alert-warning alert-dismissible fade show mt-3 lh-sm overflow-scroll"
									role="alert"
									style={{ maxWidth: '360px' }}
								>
									<strong>Oops!</strong> You seem to have selected an invalid image type. You can only
									use jpg, jpeg or png image types
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="alert"
										aria-label="Close"
									/>
								</div>
							)}
						</div>
					</div>
					<div className="d-block m-4">
						<button
							type="button"
							className="btn btn-outline-secondary w-25"
							onClick={() => setplaceTrue(false)}
						>
							Back
						</button>
						<button
							type="button"
							className="btn btn-outline-secondary w-25 ms-5"
							onClick={() => setimageTrue(true)}
						>
							Next
						</button>
					</div>
				</div>
			) : (
				<React.Fragment />
			)}

			{placeTrue && imageTrue ? (
				<div>
					<p className="h3">Add an Impulse Response</p>
					<div className="d-flex justify-content-between pt-5">
						<img
							src="https://p.kindpng.com/picc/s/12-126112_sound-wave-icon-sound-waves-overlay-png-transparent.png"
							className="rounded"
							width="300px"
							height="300px"
							alt="None"
						/>
						<div className="d-block ps-5" id="input-group">
							<label className="form-label" htmlFor="customFile">
								<p className="lead"> Upload</p>
							</label>
							<input
								type="file"
								className="form-control"
								onChange={checkAndSelectAudio}
								onClick={(e) => (e.target.value = null)}
							/>
							{!audioValidated && (
								<div
									className="alert alert-warning alert-dismissible fade show mt-3 lh-sm overflow-scroll"
									role="alert"
									style={{ maxWidth: '360px' }}
								>
									<strong>Oops!</strong> You seem to have selected an invalid file type. You can only
									use mp3 or wav file types
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="alert"
										aria-label="Close"
									/>
								</div>
							)}
						</div>
					</div>
					<div className="d-block m-4">
						<button
							type="button"
							className="btn btn-outline-secondary w-25"
							onClick={() => setimageTrue(false)}
						>
							Back
						</button>
						<button type="button" className="btn btn-outline-secondary w-25 ms-5">
							Next
						</button>
					</div>
				</div>
			) : (
				<React.Fragment />
			)}
		</div>
	);
}
