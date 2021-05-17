import {RefObject, useCallback, useEffect, useState} from "react";

const useContextMenu = (outerRef: RefObject<HTMLElement>) => {
    const [xPos, setXPos] = useState<string|0>("0px");
    const [yPos, setYPos] = useState<string|0>("0px");
    const [menu, showMenu] = useState<boolean>(false);

    const handleContextMenu = useCallback(
        event => {
            event.preventDefault();
            console.log(outerRef)
            if (!outerRef?.current?.contains(event.target)) {
                return showMenu(false)
            }
            setXPos(`${event.pageX}px`);
            setYPos(`${event.pageY}px`);
            showMenu(true);
        },
        [showMenu, outerRef, setXPos, setYPos]
    );

    const handleClick = useCallback(() => {
        showMenu(false);
    }, [showMenu]);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return {xPos, yPos, menu};
};

export default useContextMenu;
