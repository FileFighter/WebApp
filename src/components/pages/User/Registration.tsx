import React, { ReactElement, useEffect, useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import fileFighter from "../../../assets/images/logos/adventurer-run.gif";
import { registerNewUser } from "../../../background/api/registration";
import {
    getWindowSize,
    getWindowSize_Interface
} from "../../../background/methods/windowSize";
import { getStyleValue } from "../../../background/methods/style";
import {
    DEFAULT_ALERT_DURATION,
} from "../../../background/constants";
import UserInformationInput, {
    UserInformationInputInterface
} from "./UserInformationInput";

export default function Registration(): ReactElement {
    const [alertMessage, setAlertMessage] = useState<string>(
        "Error 404: No Message found."
    );
    const [alertVariant, setAlertColor] = useState<
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark"
    >("success");
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false);

    const registrationContainer = document.getElementById(
        "registrationContainer"
    );
    const logoSubmit = document.getElementById("logoSubmit");

    useEffect(() => {
        function repositionSubmitLogo() {
            const logo = document.getElementById("logoSubmit");
            if (logo) {
                const container: HTMLElement | null = document.getElementById(
                    "registrationContainer"
                );
                const leftContainerOffset: number =
                    container?.getBoundingClientRect().left ?? 0;

                let containerPadding: string | number | null = getStyleValue(
                    container,
                    "padding-left"
                );
                const pxPosition = containerPadding.indexOf("px");
                containerPadding =
                    pxPosition === -1
                        ? null
                        : Number(containerPadding.substr(0, pxPosition));

                logo.style.left =
                    -(
                        leftContainerOffset +
                        logo.offsetWidth * 2 +
                        (containerPadding ?? 20)
                    ) + "px";
            }
        }

        repositionSubmitLogo();
    }, [registrationContainer, logoSubmit]);

    const handleSubmit = async (newUser: UserInformationInputInterface) => {
        console.log("[REGISTRATION] handleSubmit");

        if (!newUser.password) {
            handleAlertVisibility(
                DEFAULT_ALERT_DURATION,
                "danger",
                "Please specify a password!"
            )
            return
        }

        // FIXME: remove confirmation-password in backend
        registerNewUser(
            newUser.username,
            newUser.password!!,
            newUser.password!!
        )
            .then((res) => {
                handleAlertVisibility(
                    DEFAULT_ALERT_DURATION,
                    "success",
                    "Worked: " +
                    (res.outputMessage
                        ? res.outputMessage
                        : res.httpStatus + " " + res.httpMessage)
                );
                toggleSubmitLogo();
            })
            .catch((err) => {
                handleAlertVisibility(
                    DEFAULT_ALERT_DURATION,
                    "danger",
                    "Error: " +
                    (err.outputMessage
                        ? err.outputMessage
                        : err.httpStatus + " " + err.httpMessage)
                );
            });
    };

    const handleAlertVisibility = (
        duration: number,
        color:
            | "primary"
            | "secondary"
            | "success"
            | "danger"
            | "warning"
            | "info"
            | "light"
            | "dark",
        message: string
    ) => {
        if (!alertVisibility) {
            setAlertMessage(message);
            setAlertColor(color);
            setAlertVisibility(true);
            setTimeout(() => {
                setAlertVisibility(false);
            }, duration);
        }
    };

    return (
        <Container id="registrationContainer">
            <Row>
                <div className="px-3 w-100">
                    <h1>Create new account</h1>
                    <UserInformationInput
                        triggerAlert={
                            (errorMessage: string) => handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", errorMessage)
                        }
                        submitFunction={handleSubmit}
                    />
                    <Alert
                        variant={alertVariant}
                        onClose={() => setAlertVisibility(false)}
                        show={alertVisibility}
                        dismissible
                    >
                        <p>{alertMessage}</p>
                    </Alert>
                </div>
            </Row>
            <img
                className={"invisible m0 position-relative"}
                src={fileFighter}
                alt="logo"
                id="logoSubmit"
            />
        </Container>
    );

    function toggleSubmitLogo() {
        const logo = document.getElementById("logoSubmit");
        if (logo) {
            const size: getWindowSize_Interface = getWindowSize();

            setTimeout(() => {
                //run right
                logo.style.transition = "4s";
                logo.classList.remove("invisible");
                logo.classList.add("visible");
                logo.style.transform =
                    "translateX(" +
                    (logo.offsetWidth + size.viewportWidth) +
                    "px)";
            }, 1000);
            setTimeout(() => {
                //turn around
                logo.style.transition = "2s";
                logo.style.transform =
                    "translateX(" +
                    (logo.offsetWidth + size.viewportWidth) +
                    "px) scaleX(-1)";
            }, 4000);
            setTimeout(() => {
                //run left
                logo.style.transition = "4s";
                logo.style.transform = "scaleX(-1)";
            }, 5000);
            setTimeout(() => {
                //turn around
                logo.style.transform = "";
                logo.classList.add("invisible");
                logo.classList.remove("visible");
            }, 8000);
        }
    }
}
