import React from "react";
import { storiesOf } from "@storybook/react";
import Error404 from "./Error404";
import { BrowserRouter } from "react-router-dom";

storiesOf("Error404", module).add("default", () => (
    <BrowserRouter>
        <Error404 />
    </BrowserRouter>
));
