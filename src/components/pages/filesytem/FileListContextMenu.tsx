import React from "react";
import useContextMenu from "../../../background/reactHooks/useContextMenu";

const Menu = ({outerRef}: any) => {
    const {xPos, yPos, menu} = useContextMenu(outerRef);

    if (!menu) {
        return <></>
    }
    return (
        <ul className="fileListContextMenu" style={{top: yPos, left: xPos}}>
            <li>Item1</li>
            <li>Item2</li>
            <li>Item3</li>
        </ul>
    );

};

export default Menu;