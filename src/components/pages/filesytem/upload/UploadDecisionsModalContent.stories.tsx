import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../../../background/redux/store";
import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import { UploadDecisionsModalContent } from "./UploadDecisionsModalContent";
import { Modal } from "react-bootstrap";
import { EditablePreflightEntityOrFile } from "../../../../background/api/filesystemTypes";

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
      name: "bla",
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
    }
  ].map((e: EditablePreflightEntityOrFile) => {
    e.prevNewPath = e.path;

    return e;
  });

  const [preflightResult, setPreflightResultState] = useState<
    EditablePreflightEntityOrFile[]
  >(preflightResultInit);
  const setPreflightResultDispatch = (
    action: EditablePreflightEntityOrFile[]
  ) => {
    let currentState = preflightResult;
    console.log(currentState.filter((e) => !e.isFile));
    if (action.length === 1) {
      if (!action[0].isFile && action[0].newPath) {
        //change the path in all subfoders / subfiles

        let elementToReplace: EditablePreflightEntityOrFile;
        let restOfElements: EditablePreflightEntityOrFile[] = [];

        currentState.forEach((e) => {
          if (e.path === action[0].path) {
            elementToReplace = e;
          } else restOfElements.push(e);
        });

        // @ts-ignore
        let oldPath = elementToReplace.prevNewPath ?? "ts sucks";

        let modifiedEntities = restOfElements.map((e) => {
          let currentPath = e.newPath ?? e.path;
          let index = currentPath.indexOf(oldPath);

          if (index === 0) {
            e.newPath = action[0].newPath + currentPath.substr(oldPath?.length);
            e.prevNewPath =
              action[0].newPath + currentPath.substr(oldPath?.length);
          }
          return e;
        });
        action[0].prevNewPath = action[0].newPath;
        console.log([...modifiedEntities, ...action].filter((e) => !e.isFile));
        setPreflightResultState([...modifiedEntities, ...action]);
      } else {
        setPreflightResultState([
          ...currentState.filter((e) => e.path !== action[0].path),
          ...action
        ]); // do sorting here?
      }
    } else setPreflightResultState(action);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Modal show={true} onHide={() => {}} contentClassName={"bg-body"}>
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
