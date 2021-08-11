import React from "react";
import { storiesOf } from "@storybook/react";
import Error400 from "./Error400";
import { BrowserRouter } from "react-router-dom";

storiesOf("Error400", module).add("default", () => {
    // eslint-disable-next-line no-restricted-globals
    const params = new URLSearchParams(location.search);
    params.set("message", "foo");
    params.set("dest", encodeURIComponent("/data/test/fuidshfjk"));
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, "", `?${params.toString()}`);

    return (
        <BrowserRouter>
            <Error400 />
        </BrowserRouter>
    );
});
