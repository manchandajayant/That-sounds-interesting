import React from 'react';
import Map from './Map';


export default function Homepage({ controllerVal }) {

	return (
		<div>
			<Map controllerVal={controllerVal} />
		</div>
	);
}
