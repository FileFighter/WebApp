import React, { ReactElement, useEffect, useState } from "react";
import { getFolderContents } from "../../../background/api/filesystem";
import { FsEntity } from "../../../background/api/filesystemTypes";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FilesBreadcrumb } from "./FilesBreadcrumb";
import { filesBaseUrl } from "./Filesystem";
import { sortObjectsInArrayByProperty } from "./sortFilesAndFolders";
import FileListItem from "./FileListItem";
import { SystemState } from "../../../background/redux/actions/sytemState";
import {
  addToSelected,
  clearSelected,
  removeFromSelected,
  replaceSelected
} from "../../../background/redux/actions/filesystem";
import { connect, ConnectedProps } from "react-redux";

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
  clearSelected
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
  const allAreSelected = !!filesAndFolders?.every((e: FsEntity) =>
    props.filesystem.selectedFsEnties.find(
      (selectedEl: FsEntity) => e.fileSystemId === selectedEl.fileSystemId
    )
  );
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
        })
        .catch((err) => {
          setError(err.response?.data.message);
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
    if (sortedBy === property) setSortIncreasing(!sortIncreasing);
    else {
      setSortedBy(property);
      setSortIncreasing(true);
    }
    setFilesAndFolders(
      sortObjectsInArrayByProperty(filesAndFolders, property, sortIncreasing)
    );
  }

  // console.log("--------------------------------------------------------------------------------------")
  //     console.log(folders)
  //     let foldersa = folders ? [...folders] : []
  //     let filesa = files ? [...files] : []
  //     let sortedFoldersa = sortObjectsInArrayByProperty(foldersa, "name")
  //     let sortedFilesa = sortObjectsInArrayByProperty(filesa, "name")
  //     console.log(sortedFoldersa)
  //     console.log("---------")
  //     console.log(filesa)
  //     console.log()
  // console.log("--------------------------------------------------------------------------------------")
  console.log("[FileList path]" + path);
  return (
    <Container fluid>
      <FilesBreadcrumb path={path} setPath={setPath} />
      <Row>
        <Col xs={1}>
          {" "}
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              checked={allAreSelected}
              type="checkbox"
              onChange={handleSelectAllChanged}
            />
          </Form.Group>
        </Col>
        <Col xs={1} onClick={() => handleSortClick("type")}>
          {"Type"}
        </Col>
        <Col xs={1}>{}</Col>
        <Col xs={1}>{"Share"}</Col>
        <Col xs={3} onClick={() => handleSortClick("name")}>
          {"Name"}
        </Col>
        <Col xs={3} onClick={() => handleSortClick("createdByUser")}>
          {"Owner"}
        </Col>
        <Col xs={1} onClick={() => handleSortClick("lastUpdated")}>
          {"Last changes"}
        </Col>
        <Col xs={1} onClick={() => handleSortClick("size")}>
          {"Size"}
        </Col>
      </Row>
      <hr />
      <Row>
        {error ? (
          <Col className={"text-center"}> {error}</Col>
        ) : !filesAndFolders ? (
          <Col className={"text-center"}> Nothing to see here.</Col>
        ) : null}

        {filesAndFolders?.map((folder: FsEntity, i: number) => {
          return (
            <FileListItem
              key={i.toString()}
              setPath={setPath}
              fileListItem={folder}
            />
          );
        })}
      </Row>
    </Container>
  );
}

export default connector(FileList);
