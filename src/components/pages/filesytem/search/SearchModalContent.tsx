import React, { ReactElement, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { FsEntity } from "../../../../background/api/filesystemTypes";
import { searchFsEntities } from "../../../../background/api/filesystem";
import SearchResult from "./SearchResult";

interface Props {
    handleClose: () => void;
}

function SearchModalContent({ handleClose }: Props): ReactElement {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState<FsEntity[]>([]);
    const [requestOngoing, setRequestOngoing] = useState(false);
    const [lastRequestValue, setLastRequestValue] = useState("");
    const [error, setError] = useState("");

    function refreshSearch(newValue: string) {
        if (!requestOngoing && lastRequestValue !== newValue) {
            setRequestOngoing(true);
            searchFsEntities(newValue)
                .then((response) => {
                    setSearchResult(response.data);
                    setLastRequestValue(newValue);
                    setRequestOngoing(false);
                    setError("");
                })
                .catch((error) => {
                    setLastRequestValue(newValue);
                    setRequestOngoing(false);
                    setError(error.data.message);
                });
        }
    }

    const updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchValue(newValue);

        if (newValue && newValue.length > 2) {
            refreshSearch(newValue);
            return;
        }
        setSearchResult([]);
    };

    console.log(searchResult);
    return (
        <>
            <Modal.Header closeButton>
                <div>
                    <Modal.Title>Search for files or folders</Modal.Title>
                    <Form.Group controlId="searchValue">
                        <Form.Label>Folder name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Pictures"
                            value={searchValue}
                            onChange={updateSearchValue}
                        />
                    </Form.Group>
                </div>
            </Modal.Header>
            <Modal.Body>
                {searchValue
                    ? searchResult.length > 0
                        ? searchResult?.map((fsEntity: FsEntity) => (
                              <SearchResult
                                  handleClose={handleClose}
                                  fsEntity={fsEntity}
                              />
                          ))
                        : "Nothing found"
                    : "Enter something"}
            </Modal.Body>
        </>
    );
}

export { SearchModalContent };
