let convolver: ConvolverNode, audioCtx, input: MediaStreamAudioSourceNode;

const getImpulseBuffer = async (audioCtx: AudioContext, impulseUrl: string): Promise<AudioBuffer> => {
    const response = await fetch(impulseUrl);
    const arrayBuffer = await response.arrayBuffer();
    return audioCtx.decodeAudioData(arrayBuffer);
};

const getLiveAudio = async (audioCtx: AudioContext): Promise<MediaStreamAudioSourceNode> => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return audioCtx?.createMediaStreamSource(stream);
};

export async function connectAudioNode(space: any) {
    audioCtx = new AudioContext() as AudioContext;
    convolver = audioCtx.createConvolver();
    input = await getLiveAudio(audioCtx);

    convolver.buffer = await getImpulseBuffer(audioCtx, space.ir);
    input.connect(convolver).connect(audioCtx.destination);
}

export function disconnectAudioNode() {
    convolver.disconnect();
    console.log(input.mediaStream.getAudioTracks()[0].enabled);
}
