import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState} from "react";
import {Container, Row, Col, Form, FormGroup, Button, Alert} from "react-bootstrap";
import {deleteSpaces} from "../../background/methods/strings";
import {biggerMaxStrLength, notMinStrLength} from "../../background/methods/checkInput";
import info_svg from "../../assets/images/icons/material.io/info-24px.svg";
import check_svg from "../../assets/images/icons/material.io/check_circle-24px.svg";
import error_svg from "../../assets/images/icons/material.io/error-24px.svg";
import {registerNewUser} from "../../background/api/registration";

export default function Registration(): ReactElement {
    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 20;

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [passwordInformationLength, setPasswordInformationLength] = useState<boolean>(false);
    const [passwordInformationLowercase, setPasswordInformationLowercase] = useState<boolean>(false);
    const [passwordInformationUppercase, setPasswordInformationUppercase] = useState<boolean>(false);
    const [passwordInformationNumber, setPasswordInformationNumber] = useState<boolean>(false);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState<string>("Error 404: No Message found.");
    const [alertVariant, setAlertColor] = useState<"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark">("success");
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false);

    useEffect(() => {
        reviewPasswordMatch()
        // eslint-disable-next-line
    },[passwordConfirmation, password])

    const handleSubmit = async (event: FormEvent) => {
        console.log("[REGISTRATION] handleSubmit")
        event.preventDefault();
        reviewPasswordMatch();
        if (!username){
            setAlertColor("danger");
            setAlertMessage("Error: Please choose an username.")
            handleAlertVisibility(3500)
        } else if (!passwordsMatch) {
            setAlertColor("danger");
            setAlertMessage("Error: Password and password confirmation must match.")
            handleAlertVisibility(3500)
        } else if (!passwordInformationNumber || !passwordInformationLowercase || !passwordInformationUppercase || !passwordInformationLength){
            setAlertColor("danger");
            setAlertMessage("Error: Please pay attention to the notes below the input field.");
            handleAlertVisibility(3500)
        } else {
            await registerNewUser(username, password, passwordConfirmation)
                .then(res => {
                    setAlertMessage("Worked: " + (res.outputMessage ? res.outputMessage : (res.httpStatus + " " + res.httpMessage)));
                    setAlertColor("success");
                    console.table(res);
                })
                .catch(err => {
                    setAlertColor("danger");
                    setAlertMessage("Error: " + (err.outputMessage ? err.outputMessage : (err.httpStatus + " " + err.httpMessage)))
                    console.table(err)
                })
                .finally(() => handleAlertVisibility(3500))
        }
    }

    const handleAlertVisibility = (duration: number) => {
        if (!alertVisibility) {
            setAlertVisibility(true);
            setTimeout(() => {
                setAlertVisibility(false)
            }, duration)
        }
    }

    const makePasswordInputFitRules = (input:string):[string,boolean] => {
        input = deleteSpaces(input);
        if (biggerMaxStrLength(input, MAX_PASSWORD_LENGTH)){
            return [input,false];
        }
        return [input,true];
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let value:[string,boolean]|string = makePasswordInputFitRules(event.target.value);
        if (!value[1]){
            value = password;
        } else {
            value = value[0]
        }
        setPasswordInformationLength(!notMinStrLength(value, MIN_PASSWORD_LENGTH));
        setPasswordInformationLowercase(value.match(/[a-z]/) !== null);
        setPasswordInformationUppercase(value.match(/[A-Z]/) !== null);
        setPasswordInformationNumber(value.match(/\d/) !== null);
        setPassword(value)
    }

    const handlePasswordConfirmationChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let value:[string,boolean]|string = makePasswordInputFitRules(event.target.value);
        if (!value[1]){
            value = passwordConfirmation;
        } else {
            value = value[0]
        }
        setPasswordConfirmation(value);
    }

    const reviewPasswordMatch = ():void => {
        setPasswordsMatch(password === passwordConfirmation);
    }

    return (
        <Container>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <h1>Create new account</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type={"name"} value={username}
                                          onChange={event => setUsername(event.target.value)}/>
                        </FormGroup>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Must contain one number, uppercase & lowercase letter each"
                                          value={password}
                                          onChange={(event: ChangeEvent<HTMLInputElement>) => handlePasswordChange(event)}/>
                            <div>
                                <img alt={"status icon password length"}
                                     src={passwordInformationLength ? check_svg : info_svg}/>
                                <span className={"sr-only"}>{passwordInformationLength ? "Done: " : "Missing: "}</span>
                                <span className={passwordInformationLength ? "text-success" : "text-muted"}>Passwords must be at least 8 characters.</span>
                            </div>
                            <div>
                                <img alt={"status icon password contains uppercase character"}
                                     src={passwordInformationUppercase ? check_svg : info_svg}/>
                                <span
                                    className={"sr-only"}>{passwordInformationUppercase ? "Done: " : "Missing: "}</span>
                                <span className={passwordInformationUppercase ? "text-success" : "text-muted"}>Passwords must be at least contain 1 uppercase character.</span>
                            </div>
                            <div>
                                <img alt={"status icon password contains lowercase character"}
                                     src={passwordInformationLowercase ? check_svg : info_svg}/>
                                <span
                                    className={"sr-only"}>{passwordInformationLowercase ? "Done: " : "Missing: "}</span>
                                <span className={passwordInformationLowercase ? "text-success" : "text-muted"}>Passwords must be at least contain 1 lowercase character.</span>
                            </div>
                            <div>
                                <img alt={"status icon password contains number"}
                                     src={passwordInformationNumber ? check_svg : info_svg}/>
                                <span className={"sr-only"}>{passwordInformationNumber ? "Done: " : "Missing: "}</span>
                                <span className={passwordInformationNumber ? "text-success" : "text-muted"}>Passwords must be at least contain 1 number.</span>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Re-enter password</Form.Label>
                            <Form.Control type="password"
                                          value={passwordConfirmation}
                                          onChange={(event: ChangeEvent<HTMLInputElement>) => handlePasswordConfirmationChange(event)}/>
                            <div>
                                <img alt={"status icon passwords match"}
                                     src={!passwordConfirmation ? info_svg : passwordsMatch ? check_svg : error_svg}/>
                                <span className={"sr-only"}>{passwordsMatch ? "Done: " : "Missing: "}</span>
                                <span
                                    className={!passwordConfirmation ? "text-muted" : passwordsMatch ? "text-success" : "text-danger"}>Passwords must match.</span>
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Alert variant={alertVariant} onClose={() => setAlertVisibility(false)} show={alertVisibility}
                               dismissible>
                            <p>{alertMessage}</p>
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
