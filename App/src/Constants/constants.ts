export const CONSTANTS = {
    accessToken: process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN,
    mapStyleURL: `mapbox://styles/jayantmanchanda/ckynbop6g56nw14l2m5r2t7bd`,
    info: {
        icon: "info",
        text: "I am currently working on setting up a process for this",
    },
    process: {
        icon: "What should i do ?",
        text: "By interacting with a map, you can explore various locations marked by pink dots. Simply click on a dot, and a popup will appear, providing details about that specific place. If you wish to immerse yourself further, click on the microphone icon. Your browser will prompt you to grant microphone permissions, enabling you to hear your own voice within the selected location. For optimal experience, remember to use headphones to prevent any audio feedback loops.",
    },
    initialViewPort: {
        latitude: 40.47,
        longitude: 3.45,
        zoom: 1.6,
    },
    swalSpace: {
        imageHeight: 400,
        imageWidth: 400,
        imageAlt: "A tall image",
        html:
            "<div style='display:block'>" +
            '<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn"  id="btn">' +
            "<i class='fa fa-microphone fa-2x' aria-hidden='true' id='microphone'></i>" +
            "</button></div>",
        showCloseButton: true,
        showCancelButton: false,
        allowOutsideClick: false,
        focusConfirm: false,
        showConfirmButton: false,
    },
    map: {
        dimensions: {
            width: "100vw",
            height: "100vh",
        },
    },
};
