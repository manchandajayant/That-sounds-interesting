import "mapbox-gl/dist/mapbox-gl.css";
import React, { ReactElement, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Swal from "sweetalert2";
import { CONSTANTS } from "../../Constants/constants";
import { Space } from "../../Types/Space-type";
import { Viewport } from "../../Types/Viewport-type";
import { connectAudioNode, disconnectAudioNode } from "../../helpers/webAudio";
import { SpacePopup } from "./Popup";
import data from "./data.json";
import { SpaceComponent } from "./space";

const Map: React.FC = (): ReactElement => {
    const [viewport, setViewport] = useState<Viewport>(CONSTANTS.initialViewPort);

    const [showPopup, togglePopup] = useState<boolean>(false);
    const [audioTrue, setAudioTrue] = useState<boolean>(false);

    const handleClick = (space: Space): void => {
        let counter = 0;
        let btnClicked = true;
        const btn = document.getElementById("btn");

        Swal.fire({
            ...CONSTANTS.swalSpace,
            imageUrl: space.image,
            title: space.name,
        }).then(() => {
            if (audioTrue || btnClicked) disconnectAudioNode();
        });

        if (btn) {
            btn.onclick = (): void => {
                setAudioTrue(true);
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
                height={CONSTANTS.map.dimensions.height}
                width={CONSTANTS.map.dimensions.width}
                mapboxApiAccessToken={CONSTANTS.accessToken}
                mapStyle={CONSTANTS.mapStyleURL}
                onViewportChange={(nextViewport: Viewport) => setViewport(nextViewport)}
            >
                <SpaceComponent handleClick={handleClick} data={data} />
                {showPopup && <SpacePopup togglePopup={togglePopup} />}
            </ReactMapGL>
        </div>
    );
};

export default Map;
