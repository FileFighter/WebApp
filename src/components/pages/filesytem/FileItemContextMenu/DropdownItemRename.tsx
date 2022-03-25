import React, { useEffect, useRef, useState } from "react"
import { Button, Dropdown, Form, Modal, Row } from "react-bootstrap"
import { DropdownItemTitleInterface } from "./DropdownItemTitleInterface"
import { renameFsEntity } from "../../../../background/api/filesystem"
import { useDispatch } from "react-redux"
import {
    addToContents,
    removeFromContents,
} from "../../../../background/redux/actions/filesystem"

export const DropdownItemRename = (props: DropdownItemTitleInterface) => {
    const { icon, description, fsEntity, disabled = false } = props

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [inodeName, setInodeName] = useState(fsEntity.name)
    const [error, setError] = useState("")

    const inputElement = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputElement?.current?.focus()
    }, [])

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)
    const handleApply = () => {
        renameFsEntity(inodeName, fsEntity.path)
            .then((response) => {
                dispatch(removeFromContents(fsEntity))
                dispatch(addToContents(response.data))
                setError("")
                handleClose()
            })
            .catch((error) => {
                setError(
                    error.response?.data?.message ?? "Something went wrong :("
                )
            })
    }

    return (
        <Dropdown.Item disabled={disabled} onClick={handleShow} download>
            <Modal
                show={showModal}
                onHide={handleClose}
                contentClassName={"bg-body"}
            >
                <Form onSubmit={handleApply}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formFolderName">
                            <Form.Label>Folder name</Form.Label>
                            <Form.Control
                                ref={inputElement}
                                type="text"
                                placeholder="e.g. My Cat Pictures"
                                value={inodeName}
                                onChange={(event) =>
                                    setInodeName(event.target.value)
                                }
                            />
                        </Form.Group>
                        {error && <p className="text-danger">{error}</p>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Row className="w-100 justify-content-between">
                            <Button variant="secondary" onClick={handleClose}>
                                Abort
                            </Button>
                            <Button variant="primary" onClick={handleApply}>
                                Rename
                            </Button>
                        </Row>
                    </Modal.Footer>
                </Form>
            </Modal>
            <span className="d-flex w-100">
                <span className="flex-grow-0 pr-1 w-25 align-content-center">
                    {icon}
                </span>
                <span className="flex-grow-1"> {description}</span>
            </span>
        </Dropdown.Item>
    )
}
