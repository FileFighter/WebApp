import React from "react";
import { storiesOf } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import "../../../style/custom.scss";
import Login, { LoginHeader, LoginInput, LoginInteractionArea } from "./Login";
import { action } from "@storybook/addon-actions";
import store from "../../../background/redux/store";
import { Provider } from "react-redux";

storiesOf("Login", module)
    .add("default", () => (
        <Provider store={store}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    ))

    .add("onlyHeader", () => (
        <Provider store={store}>
            <BrowserRouter>
                <LoginHeader />
            </BrowserRouter>
        </Provider>
    ))

    .add("onlyInput", () => (
        <Provider store={store}>
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
        </Provider>
    ))

    .add("interactionArea", () => (
        <Provider store={store}>
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
        </Provider>
    ));
