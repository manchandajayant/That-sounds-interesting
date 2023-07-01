import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Swal from "sweetalert2";
import { connectAudioNode, disconnectAudioNode } from "../webAudio";
import data from "./data.json";
import { CONSTANTS } from "../../Constants/constants";
const accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const Map = () => {
    const [viewport, setViewport] = useState<Viewport>({
        latitude: 40.47,
        longitude: 3.45,
        zoom: 1.6,
    });

    const [showPopup, togglePopup] = React.useState(false);
    const [audioTrue, setaudioTrue] = useState(false);

    const handleClick = (space: any) => {
        let counter = 0;
        let btnClicked = true;
        Swal.fire({
            imageUrl: space.image,
            imageHeight: 400,
            imageWidth: 400,
            imageAlt: "A tall image",
            title: space.name,
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
        }).then(() => {
            if (audioTrue || btnClicked) disconnectAudioNode();
        });
        const btn = document.getElementById("btn");
        if (btn) {
            btn.onclick = () => {
                setaudioTrue(true);
                btnClicked = true;
                const micElement = document.getElementById("microphone");
                // This is one of the shoddiest solutions to anything ever, must improve on this.
                counter++;
                if (counter % 2 !== 0) {
                    connectAudioNode(space);
                    if (micElement) micElement.style.color = "rgb(255,20,147,0.7)";
                } else {
                    disconnectAudioNode();
                    if (micElement) micElement.style.color = "rgb(0,0,0,0.7)";
                }
            };
        }
    };

    return (
        <div className="map-container">
            <ReactMapGL
                {...viewport}
                height={"100vh"}
                width={"100vw"}
                mapboxApiAccessToken={accessToken}
                mapStyle={CONSTANTS.mapStyleURL}
                onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
            >
                {" "}
                {data.map((space, i) => {
                    return (
                        <div key={i} data-toggle="tooltip" data-placement="top" title={space.name}>
                            <Marker
                                latitude={space.lat}
                                longitude={space.lng}
                                offsetLeft={-7}
                                offsetTop={-20}
                                captureClick={true}
                                onClick={() => handleClick(space)}
                            >
                                <i className="fas fa-circle" id="marker"></i>
                            </Marker>
                        </div>
                    );
                })}
                {showPopup && (
                    <Popup
                        latitude={37.78}
                        longitude={-77.41}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => togglePopup(false)}
                        anchor="top"
                        dynamicPosition={false}
                    >
                        <div>You are here</div>
                    </Popup>
                )}
            </ReactMapGL>
        </div>
    );
};

type Viewport = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export default Map;
