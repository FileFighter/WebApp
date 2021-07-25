import { useSelector } from "react-redux";
import React, { ReactElement, useState } from "react";
import { RootState } from "../../../../background/redux/store";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { NewFolderModalContent } from "./NewFolderModalContent";

function NewFolder(): ReactElement {
    const currentFsItemId = useSelector(
        (state: RootState) => state.filesystem.currentFsItemId
    );
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    if (currentFsItemId === "-1") {
        return <></>;
    }

    return (
        <>
            <Button
                size="sm"
                variant="outline-secondary"
                onClick={handleShow}
                className="mx-1"
            >
                New Folder
            </Button>
            <Modal
                show={showModal}
                onHide={handleClose}
                contentClassName={"bg-body"}
            >
                <NewFolderModalContent
                    handleClose={handleClose}
                    currentFsItemId={currentFsItemId}
                />
            </Modal>
        </>
    );
}

export { NewFolder };
