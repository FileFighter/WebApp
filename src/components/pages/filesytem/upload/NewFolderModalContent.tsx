import { Button, Form, Modal, Row } from "react-bootstrap";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { createNewFolder } from "../../../../background/api/filesystem";
import { isFileNameValid } from "../../../../background/methods/filesystem";
import { useDispatch } from "react-redux";
import { addToContents } from "../../../../background/redux/actions/filesystem";

interface Props {
    handleClose: () => void;
    currentFsItemId: string;
}

function NewFolderModalContent({ handleClose, currentFsItemId }: Props) {
    const dispatch = useDispatch();
    const [folderName, setFolderName] = useState("");
    const [error, setError] = useState("");

    const inputElement = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputElement?.current?.focus();
    }, []);

    function handleApply(event: FormEvent) {
        event.preventDefault();
        console.log("[NEW FOLDER ]", folderName);
        if (!isFileNameValid(folderName)) {
            setError("The name is not a valid foldername.");
            return;
        }

        createNewFolder(folderName, currentFsItemId)
            .then((response) => {
                dispatch(addToContents(response.data));
                setError("");
                handleClose();
            })
            .catch((error) =>
                setError(
                    error.response?.data.message ?? "Something went wrong :("
                )
            );
    }

    return (
        <Form onSubmit={handleApply}>
            <Modal.Header closeButton>
                <Modal.Title>Create new Directory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formFolderName">
                    <Form.Label>Folder name</Form.Label>
                    <Form.Control
                        ref={inputElement}
                        type="text"
                        placeholder="e.g. My Cat Pictures"
                        value={folderName}
                        onChange={(event) => setFolderName(event.target.value)}
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
                        Create Folder
                    </Button>
                </Row>
            </Modal.Footer>
        </Form>
    );
}

export { NewFolderModalContent };
