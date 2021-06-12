import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Footer from "./Footer";

storiesOf("Footer", module).add("default", () => (
    <BrowserRouter>
        <Footer />
    </BrowserRouter>
));
