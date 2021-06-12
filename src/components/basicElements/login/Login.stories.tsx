import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import "../../../style/custom.scss";
import Login, { LoginHeader, LoginInput, LoginInteractionArea } from "./Login";
import { action } from "@storybook/addon-actions";

storiesOf("Login", module)
    .add("default", () => (
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    ))

    .add("onlyHeader", () => (
        <BrowserRouter>
            <LoginHeader />
        </BrowserRouter>
    ))

    .add("onlyInput", () => (
        <BrowserRouter>
            <LoginInput
                handleSubmit={() => console.log("Clicked on submit")}
                username={""}
                setUsername={action("changed username")}
                password={""}
                setPassword={action("changed password")}
                isLoading={false}
                setIsLoading={action("is loading")}
                stayLoggedIn={false}
                setStayLoggedIn={action("changed stay logged in")}
                errorMessage={""}
            />
        </BrowserRouter>
    ))

    .add("interactionArea", () => (
        <BrowserRouter>
            <LoginInteractionArea
                handleSubmit={() => console.log("Clicked on submit")}
                username={""}
                setUsername={action("changed username")}
                password={""}
                setPassword={action("changed password")}
                isLoading={false}
                setIsLoading={action("is loading")}
                stayLoggedIn={false}
                setStayLoggedIn={action("changed stay logged in")}
                errorMessage={""}
            />
        </BrowserRouter>
    ));
