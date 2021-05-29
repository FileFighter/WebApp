import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { FsEntity } from "../../../../background/api/filesystemTypes";
import { searchFsEntities } from "../../../../background/api/filesystem";
import SearchResult from "./SearchResult";
import { FFLoading } from "../../../basicElements/Loading";

interface Props {
    handleClose: () => void;
}

function SearchModalContent({ handleClose }: Props): ReactElement {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState<FsEntity[]>([]);
    const [requestOngoing, setRequestOngoing] = useState(false);
    const [lastRequestValue, setLastRequestValue] = useState("");
    const [error, setError] = useState("");

    const inputElement = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputElement?.current?.focus();
    }, []);

    useEffect(() => {
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
                        setError(
                            error.data?.message ?? "Something went wrong."
                        );
                    });
            }
        }

        if (searchValue !== lastRequestValue && !requestOngoing) {
            refreshSearch(searchValue);
            return;
        }
    }, [searchValue, lastRequestValue, requestOngoing]);

    const updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
    };

    console.log(searchResult);

    function SearchModalBody() {
        if (requestOngoing) {
            return <FFLoading />;
        }
        if (error) {
            return error;
        }
        if (!searchValue) {
            return "Enter something";
        }
        if (searchResult.length === 0) {
            return "Nothing found.";
        }
        return searchResult?.map((fsEntity: FsEntity) => (
            <SearchResult handleClose={handleClose} fsEntity={fsEntity} />
        ));
    }

    return (
        <>
            <Modal.Header closeButton>
                <div className="w-100 text-center">
                    <Modal.Title>Search for files or folders</Modal.Title>
                    <Form.Group controlId="searchValue">
                        <Form.Label>
                            Query
                            {searchResult.length > 0 &&
                                " (" + searchResult.length + " found)"}
                        </Form.Label>
                        <Form.Control
                            ref={inputElement}
                            type="text"
                            placeholder="e.g. Pictures"
                            value={searchValue}
                            onChange={updateSearchValue}
                        />
                    </Form.Group>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="minh-35">{SearchModalBody()}</div>
            </Modal.Body>
        </>
    );
}

export { SearchModalContent };
