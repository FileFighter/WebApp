import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import "../../style/custom.scss";
import Health from "./Health";

storiesOf("Health", module).add("default", () => (
  <BrowserRouter>
    <Health />
  </BrowserRouter>
));
