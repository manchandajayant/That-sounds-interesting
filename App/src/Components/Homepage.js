import React, { useEffect } from 'react';
import Map from './Map';


export default function Homepage({ controllerVal }) {
	useEffect(() => {
		
	}, []);
	return (
		<div>
			<Map controllerVal={controllerVal} />
		</div>
	);
}
