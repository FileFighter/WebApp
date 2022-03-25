import { useSelector } from "react-redux"
import React, { ReactElement, useState } from "react"
import { RootState } from "../../../../background/redux/store"
import { Button, Modal } from "react-bootstrap"
import { NewFolderModalContent } from "./NewFolderModalContent"

function NewFolder(): ReactElement {
    const currentPath = useSelector(
        (state: RootState) => state.filesystem.currentPath
    )
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

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
                    currentPath={currentPath}
                />
            </Modal>
        </>
    )
}

export { NewFolder }
