import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../../../background/redux/store";
import { BrowserRouter } from "react-router-dom";
import React, { Reducer, useReducer } from "react";
import { UploadDecisionsModalContent } from "./UploadDecisionsModalContent";
import { Modal } from "react-bootstrap";
import { preflightResultReducer } from "./UploadZone";
import {
  EditablePreflightEntityOrFile,
  PeflightEntiesActionTypes
} from "./preflightTypes";

storiesOf("Filesystem", module).add("UploadDecisionsModal", () => {
  const preflightResultInit: EditablePreflightEntityOrFile[] = [
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
      name: "bla.wow",
      path: "fasel/bla.wow",
      permissionIsSufficient: true, // can upload and can overwrite
      nameAlreadyInUse: true,
      nameIsValid: true,
      isFile: true
    },
    {
      name: "hallo.txt",
      path: "fasel/blub/hallo.txt",
      permissionIsSufficient: true, // can upload and can overwrite
      nameAlreadyInUse: true,
      nameIsValid: true,
      isFile: true
    },
    {
      name: "blub",
      path: "fasel/blub",
      permissionIsSufficient: true, // can upload and can overwrite
      nameAlreadyInUse: true,
      nameIsValid: true,
      isFile: false
    },
    {
      name: "blubfdhjsgfhj---fsd/",
      path: "fasel/blubfdhjsgfhj---fsd/",
      permissionIsSufficient: false,
      nameAlreadyInUse: true,
      nameIsValid: false,
      isFile: false
    }
  ];

  const [preflightResult, setPreflightResultDispatch] = useReducer<
    Reducer<EditablePreflightEntityOrFile[], PeflightEntiesActionTypes>
  >(preflightResultReducer, preflightResultInit);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Modal
          show={true}
          onHide={() => {}}
          contentClassName={"bg-body"}
          size="xl"
        >
          <UploadDecisionsModalContent
            handleClose={() => {}}
            preflightResult={preflightResult}
            setPreflightResultDispatch={setPreflightResultDispatch}
          />
        </Modal>
      </BrowserRouter>
    </Provider>
  );
});
