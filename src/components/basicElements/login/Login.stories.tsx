import React from "react";
import { storiesOf } from "@storybook/react";
import "../../../style/custom.scss";
import Login, { LoginHeader, LoginInput, LoginInteractionArea } from "./Login";
import { action } from "@storybook/addon-actions";
import { Wrapper } from "../../../dev/testUtils/Wrapper";

storiesOf("Login", module)
    .add("default", () => (
        <Wrapper>
            <Login />
        </Wrapper>
    ))

    .add("onlyHeader", () => (
        <Wrapper>
            <LoginHeader />
        </Wrapper>
    ))

    .add("onlyInput", () => (
        <Wrapper>
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
        </Wrapper>
    ))

    .add("interactionArea", () => (
        <Wrapper>
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
        </Wrapper>
    ));
