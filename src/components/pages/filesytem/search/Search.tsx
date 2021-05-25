import React, { ReactElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { SearchModalContent } from "./SearchModalContent";

function Search(): ReactElement {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button onClick={handleShow}>Search</Button>
            <Modal
                show={showModal}
                onHide={handleClose}
                contentClassName={"bg-body"}
            >
                <SearchModalContent handleClose={handleClose} />
            </Modal>
        </>
    );
}

export { Search };
