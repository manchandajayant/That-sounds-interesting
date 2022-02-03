var convolver, audioCtx, input;

const getImpulseBuffer = async (audioCtx, impulseUrl) => {
	const response = await fetch(impulseUrl);
	const arrayBuffer = await response.arrayBuffer();
	return audioCtx.decodeAudioData(arrayBuffer);
};

const getLiveAudio = async (audioCtx) => {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	return audioCtx.createMediaStreamSource(stream);
};

export async function connectAudioNode(space) {
	audioCtx = new AudioContext();
	convolver = audioCtx.createConvolver();
	input = await getLiveAudio(audioCtx);

	convolver.buffer = await getImpulseBuffer(
		audioCtx,
		process.env.PUBLIC_URL + `/assets/${space.ir}`
	);
	input.connect(convolver).connect(audioCtx.destination);
}

export function disconnectAudioNode() {
	convolver.disconnect();
	console.log(input.mediaStream.getAudioTracks()[0].enabled);
}
