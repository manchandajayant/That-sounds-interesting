import React, { ReactElement } from "react";
import { Popup } from "react-map-gl";

type SpacePopupProps = {
    togglePopup: (val: boolean) => void;
};

export const SpacePopup: React.FC<SpacePopupProps> = ({ togglePopup }): ReactElement => (
    <Popup
        latitude={37.78}
        longitude={-77.41}
        closeButton={true}
        closeOnClick={false}
        onClose={() => togglePopup && togglePopup(false)}
        anchor="top"
        dynamicPosition={false}
    >
        <div>You are here</div>
    </Popup>
);
