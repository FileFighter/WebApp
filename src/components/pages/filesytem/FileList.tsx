import React, { ReactElement, useEffect, useState } from "react";
import { getFolderContents } from "../../../background/api/filesystem";
import { FsEntity } from "../../../background/api/filesystemTypes";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FilesBreadcrumb } from "./FilesBreadcrumb";
import { filesBaseUrl } from "./Filesystem";
import FileListItem from "./FileListItem";
import { SystemState } from "../../../background/redux/actions/sytemState";
import {
  addToSelected,
  clearSelected,
  removeFromSelected,
  replaceSelected,
  setCurrentFsItemId
} from "../../../background/redux/actions/filesystem";
import { connect, ConnectedProps } from "react-redux";
import { FFLoading } from "../../basicElements/Loading";

const mapState = (state: SystemState) => ({
  filesystem: {
    selectedFsEnties: state.filesystem.selectedFsEnties
  }
});

// this takes the redux actions and maps them to the props
const mapDispatch = {
  addToSelected,
  removeFromSelected,
  replaceSelected,
  clearSelected,
  setCurrentFsItemId
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

function FileList(props: Props): ReactElement {
  let location = useLocation();

  const [path, setPath] = useState<string>(
    location.pathname.slice(filesBaseUrl.length) || "/"
  );
  const [filesAndFolders, setFilesAndFolders] = useState<FsEntity[] | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [sortedBy, setSortedBy] = useState<keyof FsEntity | null>(null);
  const [sortIncreasing, setSortIncreasing] = useState<boolean>(false);
  const allAreSelected =
    filesAndFolders?.length === props.filesystem.selectedFsEnties.length;

  const clearSelected = props.clearSelected;

  useEffect(() => {
    function updateStates(): void {
      getFolderContents(path)
        .then((response: FsEntity[]) => {
          console.log("got folder content");
          setFilesAndFolders([
            ...response.filter(
              (fsEntiy: FsEntity) => fsEntiy.type === "FOLDER"
            ),
            ...response.filter((fsEntiy: FsEntity) => fsEntiy.type !== "FOLDER")
          ]);
          setError("");
          props.setCurrentFsItemId(path); // TODO change this to the id of the current folder
        })
        .catch((err) => {
          setError(err.response?.data?.message);
          setFilesAndFolders(null);
        });
    }

    setPath(location.pathname.slice(filesBaseUrl.length) || "/");
    clearSelected();
    updateStates();
  }, [clearSelected, path, location]);

  const handleSelectAllChanged = () => {
    if (allAreSelected) {
      props.clearSelected();
    } else {
      if (filesAndFolders) {
        props.replaceSelected([...filesAndFolders]);
      }
    }
  };

  function handleSortClick(property: keyof FsEntity) {
    if (!filesAndFolders || filesAndFolders.length < 2) return;
    if (sortedBy === property) {
      setSortIncreasing(!sortIncreasing);
    } else {
      setSortedBy(property);
      setSortIncreasing(true);
    }
    let toSort = [...(filesAndFolders ?? [])];

    if (property === "lastUpdated" || property === "size") {
      toSort.sort((a, b) =>
        a[property] - b[property] === 0
          ? a.fileSystemId - b.fileSystemId
          : a[property] - b[property]
      );
    } else if (property === "name" || property === "type") {
      toSort.sort((a, b) =>
        a[property].toLowerCase().localeCompare(b[property].toLowerCase()) === 0
          ? a.fileSystemId - b.fileSystemId
          : a[property].toLowerCase().localeCompare(b[property].toLowerCase())
      );
    } else if (property === "createdByUser") {
      toSort.sort((a, b) =>
        a.createdByUser.username
          .toLowerCase()
          .localeCompare(b.createdByUser.username.toLowerCase()) === 0
          ? a.fileSystemId - b.fileSystemId
          : a.createdByUser.username
              .toLowerCase()
              .localeCompare(b.createdByUser.username.toLowerCase())
      );
    }
    setFilesAndFolders(sortIncreasing ? toSort.reverse() : toSort);
  }

  console.log("[FileList path]" + path);
  return (
    <Container fluid>
      <FilesBreadcrumb path={path} setPath={setPath} />
      <Row>
        <Col xs={2} md={1}>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              checked={allAreSelected}
              type="checkbox"
              onChange={handleSelectAllChanged}
            />
          </Form.Group>
        </Col>
        <Col
          xs={2}
          md={1}
          className="text-center"
          onClick={() => handleSortClick("type")}
        >
          {"Type"}
        </Col>
        <Col xs={2} md={1}>
          {"Share"}
        </Col>
        <Col xs={6} md={4} onClick={() => handleSortClick("name")}>
          {"Name"}
        </Col>
        <Col xs={6} md={3} onClick={() => handleSortClick("createdByUser")}>
          {"Owner"}
        </Col>
        <Col xs={3} md={1} onClick={() => handleSortClick("lastUpdated")}>
          {"Last changes"}
        </Col>
        <Col xs={3} md={1} onClick={() => handleSortClick("size")}>
          {"Size"}
        </Col>
      </Row>
      <hr />
      <Row>
        {error ? (
          <Col className={"text-center"}> {error}</Col>
        ) : filesAndFolders?.length === 0 ? (
          <Col className={"text-center"}> Nothing to see here.</Col>
        ) : (
          !filesAndFolders && <FFLoading />
        )}

        {filesAndFolders?.map((folder: FsEntity) => {
          return (
            <React.Fragment key={folder.fileSystemId}>
              <FileListItem setPath={setPath} fileListItem={folder} />
              <Col xs={12} className="border-top my-2" />
            </React.Fragment>
          );
        })}
      </Row>
    </Container>
  );
}

export default connector(FileList);
