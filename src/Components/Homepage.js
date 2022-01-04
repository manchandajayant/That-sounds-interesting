import React, { useEffect } from 'react';
import Map from './Map';
import toast, { Toaster,ToastBar } from 'react-hot-toast';
export default function Homepage() {
	useEffect(() => {
		toast('Select a place by clicking one of the icons on the Map');
	}, []);
	return (
		<div>
			<Map />
			<Toaster
				position="top-left"
				reverseOrder={false}
				gutter={2}
				toastOptions={{
					duration: 3000,
					style: {
						background: 'rgb(200, 0, 80)',
						color: '#fff'
					}
				}}
			/>
		</div>
	);
}
