import { storiesOf } from "@storybook/react";
import folderContentMock from "../__tests__/folderContentMock.json";
import { Provider } from "react-redux";
import store from "../../../../background/redux/store";
import { BrowserRouter } from "react-router-dom";
import FileSystem from "../Filesystem";
import React from "react";
import { UploadDecisionsModalContent } from "./UploadDecisionsModalContent";
import { Modal } from "react-bootstrap";

storiesOf("Filesystem", module).add("UploadDecisionsModal", () => {
  const preflightResult = [
    {
      name: "bla.txt",
      path: "bla.txt",
      permissionIsSufficient: true, // can upload and can overwrite
      nameAlreadyInUse: true,
      nameIsValid: true,
      isFile: true
    },
    {
      name: "fasel",
      path: "fasel",
      permissionIsSufficient: true, // can upload and can overwrite
      nameAlreadyInUse: true,
      nameIsValid: true,
      isFile: false
    },
    {
      name: "bla",
      path: "fasel/bla.wow",
      permissionIsSufficient: true, // can upload and can overwrite
      nameAlreadyInUse: true,
      nameIsValid: true,
      isFile: true
    },
    {
      name: "bl/gfds--,.,...&&a",
      path: "bl/gfds--,.,...&&a",
      permissionIsSufficient: true, // can upload and can overwrite
      nameAlreadyInUse: false,
      nameIsValid: true,
      isFile: true
    }
  ];

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Modal show={true} onHide={() => {}} contentClassName={"bg-body"}>
          <UploadDecisionsModalContent
            handleClose={() => {}}
            preflightResult={preflightResult}
            setPreflightResultDispatch={() => {}}
          />
        </Modal>
      </BrowserRouter>
    </Provider>
  );
});
