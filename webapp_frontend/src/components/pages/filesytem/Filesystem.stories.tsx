import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import "../../../style/custom.scss";
import FileSystem from "./Filesystem";
import { Provider } from "react-redux";
import store from "../../../background/redux/store";

storiesOf("Filesystem", module).add("default", () => (
  <Provider store={store}>
    <BrowserRouter>
      <FileSystem />
    </BrowserRouter>
  </Provider>
));
