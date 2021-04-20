import React, {ReactElement, useEffect, useState} from "react";
import {Alert, Col, Container, Row} from "react-bootstrap";
import {notMinStrLength} from "../../../background/methods/checkInput";
import fileFighter from "../../../assets/images/logos/adventurer-run.gif";
import {registerNewUser} from "../../../background/api/registration";
import {getWindowSize, getWindowSize_Interface} from "../../../background/methods/windowSize";
import {getStyleValue} from "../../../background/methods/style";
import {DEFAULT_ALERT_DURATION, MIN_PASSWORD_LENGTH} from "../../../background/constants";
import UserInformationInput, {UserInformationInputInterface} from "./UserInformationInput";

export default function Registration(): ReactElement {
    const [alertMessage, setAlertMessage] = useState<string>("Error 404: No Message found.");
    const [alertVariant, setAlertColor] = useState<"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark">("success");
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false);


    const registrationContainer = document.getElementById("registrationContainer")
    const logoSubmit = document.getElementById("logoSubmit")

    useEffect(() => {
        function repositionSubmitLogo() {
            const logo = document.getElementById("logoSubmit")
            if (logo) {
                const container: HTMLElement | null = document.getElementById("registrationContainer");
                const leftContainerOffset: number = container?.getBoundingClientRect().left ?? 0;

                let containerPadding: string | number | null = getStyleValue(container, "padding-left");
                const pxPosition = containerPadding.indexOf("px");
                containerPadding = pxPosition === -1 ? null : Number(containerPadding.substr(0, pxPosition))

                logo.style.left = -(leftContainerOffset + logo.offsetWidth * 2 + (containerPadding ?? 20)) + "px";
            }
        }

        repositionSubmitLogo()
    }, [registrationContainer, logoSubmit])

    const handleSubmit = async (newUser:UserInformationInputInterface) => {
        console.log("[REGISTRATION] handleSubmit")
        if (!newUser.username) {
            handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Please choose an username.")
        } else if (newUser.password !== newUser.passwordConfirmation) {
            handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Password and password confirmation must match.")
        } else if (newUser.password.match(/\d/) == null || newUser.password.match(/[a-z]/) == null || newUser.password.match(/[A-Z]/) == null || notMinStrLength(newUser.password, MIN_PASSWORD_LENGTH)) {
            handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Please pay attention to the notes below the input fields.")
        } else {
            await registerNewUser(newUser.username, newUser.password, newUser.passwordConfirmation)
                .then(res => {
                    handleAlertVisibility(DEFAULT_ALERT_DURATION, "success", "Worked: " + (res.outputMessage ? res.outputMessage : (res.httpStatus + " " + res.httpMessage)));
                    toggleSubmitLogo();
                })
                .catch(err => {
                    handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: " + (err.outputMessage ? err.outputMessage : (err.httpStatus + " " + err.httpMessage)))
                })
        }
    }

    const handleAlertVisibility = (duration: number, color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark", message: string) => {
        if (!alertVisibility) {
            setAlertMessage(message);
            setAlertColor(color);
            setAlertVisibility(true);
            setTimeout(() => {
                setAlertVisibility(false);
            }, duration);
        }
    }

    return (
        <Container className="h-100" style={{position: "relative"}} id="registrationContainer">
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <h1>Create new account</h1>
                    <UserInformationInput triggerAlert={handleAlertVisibility} submitFunction={handleSubmit}/>
                    <Alert variant={alertVariant} onClose={() => setAlertVisibility(false)} show={alertVisibility}
                           dismissible>
                        <p>{alertMessage}</p>
                    </Alert>
                </Col>
            </Row>
            <img className={"invisible m0 position-relative"} src={fileFighter} alt="logo"
                 id="logoSubmit"/>
        </Container>
    )

    function toggleSubmitLogo() {
        const logo = document.getElementById("logoSubmit")
        if (logo) {
            const size: getWindowSize_Interface = getWindowSize();

            setTimeout(() => { //run right
                logo.style.transition = "4s";
                logo.classList.remove("invisible")
                logo.classList.add("visible")
                logo.style.transform = "translateX(" + (logo.offsetWidth + size.viewportWidth) + "px)";
            }, 1000);
            setTimeout(() => { //turn around
                logo.style.transition = "2s";
                logo.style.transform = "translateX(" + (logo.offsetWidth + size.viewportWidth) + "px) scaleX(-1)";
            }, 4000);
            setTimeout(() => { //run left
                logo.style.transition = "4s";
                logo.style.transform = "scaleX(-1)";
            }, 5000);
            setTimeout(() => { //turn around
                logo.style.transform = "";
                logo.classList.add("invisible")
                logo.classList.remove("visible")
            }, 8000);
        }
    }
}
