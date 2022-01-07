import React from 'react';
const Upload = ({ toggleUploadTrue, image, audio, place }) => {
	return (
		<div className="d-block m-4">
			<button
				type="button"
				className="btn btn-outline-secondary w-25"
				onClick={() => toggleUploadTrue(false)}
			>
				Back
			</button>
			<button type="button" className="btn btn-outline-secondary w-25 ms-5">
				Upload
			</button>
		</div>
	);
};

export default Upload;
