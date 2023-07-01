import React, { FC, ReactElement } from "react";
import { Space } from "../../Types/Space-type";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

type SpaceProps = {
    data: Space[];
    handleClick: (space: Space) => void;
};

export const SpaceComponent: React.FC<SpaceProps> = ({ data, handleClick }): ReactElement[] =>
    data.map((space: Space, index: number) => (
        <div key={index} data-toggle="tooltip" data-placement="top" title={space.name}>
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
    ));
