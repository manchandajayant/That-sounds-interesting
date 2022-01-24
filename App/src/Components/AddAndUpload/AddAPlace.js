import React, { useState, useEffect } from "react";
import Login from "../Login";
import Upload from "./Upload";
import data from "./test.json";

export default function AddAPlace() {
	const [query, setQuery] = useState("");
	const [place, setPlace] = useState("");
	const [searchResults, setsearchResults] = useState({});
	const [placeTrue, setplaceTrue] = useState(false);
	const [bgColor, setbgColor] = useState("#282c34");
	const [image, setImage] = useState(
		"https://image.architonic.com/pro2-3/20167265/acoustic-art-by-nature-earth-08-pro-g-arcit18.jpg"
	);
	const [audio, setAudio] = useState({});
	const [imageValidated, setimageValidated] = useState(false);
	const [imageTrue, setimageTrue] = useState(false);
	const [audioValidated, setaudioValidated] = useState(false);
	const [readyForUpload, setreadyForUpload] = useState(false);

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

	const setSearchQuery = (e) => {
		console.log(e.target.value);
		setQuery(e.target.value);
	};

	const search = async () => {
		console.log("data", data);
		const fetchData = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`
		);
		const decodedData = await fetchData.json();
		console.log(decodedData);
		setsearchResults(decodedData);
	};

	const toggleUploadTrue = (val) => {
		setreadyForUpload(val);
	};

	const highlightClickHandler = (e, place_name) => {
		console.log(place_name);
		e.target.parentNode.style.backgroundColor = "#fff";
		e.target.parentNode.parentNode.style.backgroundColor = "#fff";
		// e.target.id === place_name && e.target.style.backgroundColor = '#000;'
	};
	// if (localStorage.getItem('jwt')) {
	if (readyForUpload) {
		return (
			<Upload
				toggleUploadTrue={toggleUploadTrue}
				image={image}
				audio={audio}
				place={place}
			/>
		);
	} else {
		return (
			<div
				className={`col-12 d-flex justify-content-center ${
					!placeTrue ? "pt-5" : "pt-0"
				}`}
				id={
					!placeTrue ? "div-add-place" : "div-add-place-file-selected"
				}
			>
				{!placeTrue && (
					<div className="mdashboard-box">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Search by text or co-ordinates..."
								aria-label="Search for a place..."
								aria-describedby="button-addon2"
								onChange={setSearchQuery}
							/>
							<button
								className="btn btn-outline-secondary"
								type="button"
								id="button-addon2"
								onClick={search}
							>
								Search
							</button>
						</div>
						{Object.keys(searchResults).length ? (
							<div className="results-container">
								{searchResults.features.map((place, index) => {
									return (
										<div key={index}>
											<ul>
												<li
													onClick={(e) =>
														highlightClickHandler(
															e,
															place.id
														)
													}
													style={{
														backgroundColor:
															bgColor,
													}}
												>
													<p
														className=""
														id={place.id}
													>
														{place.place_name}
													</p>
												</li>
												<li>
													<hr className="dropdown-divider" />
												</li>
											</ul>
										</div>
									);
								})}
							</div>
						) : (
							<></>
						)}
						<div />
						<div className="mt-5">
							<button
								className="btn btn-outline-secondary w-50"
								onClick={() => setplaceTrue(true)}
							>
								Next
							</button>
						</div>
					</div>
				)}
				{placeTrue && !imageTrue ? (
					<div>
						<p className="h3">Add an Image</p>
						<div className="d-flex justify-content-between pt-5">
							<img
								src={image}
								className="rounded"
								width="300px"
								height="300px"
								alt="None"
							/>
							<div className="d-block ps-5" id="input-group">
								<label
									className="form-label"
									htmlFor="customFile"
								>
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
										style={{ maxWidth: "360px" }}
									>
										<strong>Oops!</strong> You seem to have
										selected an invalid image type. You can
										only use jpg, jpeg or png image types
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
								<label
									className="form-label"
									htmlFor="customFile"
								>
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
										style={{ maxWidth: "360px" }}
									>
										<strong>Oops!</strong> You seem to have
										selected an invalid file type. You can
										only use mp3 or wav file types
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
							<button
								type="button"
								className="btn btn-outline-secondary w-25 ms-5"
								onClick={() => setreadyForUpload(true)}
							>
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
	// } else {
	// 	return <Login />
	// }
}
