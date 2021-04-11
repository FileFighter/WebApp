import React, {ChangeEvent, FormEvent, ReactElement, useCallback, useEffect, useState} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import check_svg from "../../../assets/images/icons/material.io/check_circle-24px.svg";
import info_svg from "../../../assets/images/icons/material.io/info-24px.svg";
import error_svg from "../../../assets/images/icons/material.io/error-24px.svg";
import {biggerMaxStrLength, notMinStrLength} from "../../../background/methods/checkInput";
import {deleteSpaces} from "../../../background/methods/strings";
import {DEFAULT_ALERT_DURATION, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH} from "../../../background/constants";

export interface UserInformationInterface {
    username: string,
    password: string,
    passwordConfirmation: string
}

type Props = {
    triggerAlert(duration: number, color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark", message: string): void,
    submitFunction(newUser: UserInformationInterface): void
}

export default function UserInformationInput(props: Props): ReactElement {
    let {triggerAlert, submitFunction} = props;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [passwordInformationLength, setPasswordInformationLength] = useState<boolean>(false);
    const [passwordInformationLowercase, setPasswordInformationLowercase] = useState<boolean>(false);
    const [passwordInformationUppercase, setPasswordInformationUppercase] = useState<boolean>(false);
    const [passwordInformationNumber, setPasswordInformationNumber] = useState<boolean>(false);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    const reviewPasswordMatch = useCallback((): void => {
        setPasswordsMatch(password === passwordConfirmation);
    }, [password, passwordConfirmation]);

    useEffect(() => {
        reviewPasswordMatch()
    }, [reviewPasswordMatch])

    const makePasswordInputFitRules = (input: string): [string, boolean] => {
        input = deleteSpaces(input);
        if (biggerMaxStrLength(input, MAX_PASSWORD_LENGTH)) {
            triggerAlert(DEFAULT_ALERT_DURATION, "warning", "Maximum password length exceeded. Input was undone.");
            return [input, false];
        }
        return [input, true];
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let value: [string, boolean] | string = makePasswordInputFitRules(event.target.value);
        if (!value[1]) {
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
        let value: [string, boolean] | string = makePasswordInputFitRules(event.target.value);
        if (!value[1]) {
            value = passwordConfirmation;
        } else {
            value = value[0]
        }
        setPasswordConfirmation(value);
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log("[UserInformationInput] handleSubmit")
        reviewPasswordMatch();
        let newUser = {username: username, password: password, passwordConfirmation: passwordConfirmation}
        submitFunction(newUser)
    }

    return (
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
                    <span className={passwordInformationLength ? "text-success" : "text-muted"}>Passwords must be between 8 and 20 characters.</span>
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
        </Form>
    )
}