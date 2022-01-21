import React, {
    ChangeEvent,
    FormEvent,
    ReactElement,
    useEffect,
    useState
} from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import check_svg from "../../../assets/images/icons/material.io/check_circle-24px.svg";
import info_svg from "../../../assets/images/icons/material.io/info-24px.svg";
import error_svg from "../../../assets/images/icons/material.io/error-24px.svg";
import { deleteSpaces } from "../../../background/methods/dataTypes/strings";
import {
    REQUIRED_PASSWORD_STRENGTH
} from "../../../background/constants";
import { PasswordStrengthBarWrapper } from "./PasswordStrengthBar";
import { RuleChecker } from "./RuleChecker";
import { PasswordFeedback } from "react-password-strength-bar";

export interface UserInformationInputInterface {
    username: string;
    password: string;
}

type UserInformationInputProps = {
    triggerAlert(errorMessage: string): void;
    submitFunction(newUser: UserInformationInputInterface): void;
    presets?: UserInformationInputInterface;
};

export default function UserInformationInput(
    props: UserInformationInputProps
): ReactElement {
    let { triggerAlert, submitFunction, presets } = props;
    const [username, setUsername] = useState<string>(presets?.username ?? "");
    const [password, setPassword] = useState<string>(presets?.password ?? "");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>(
        presets?.password ?? ""
    );

    // states to check passwords
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);

    // re-check passwords are equal after change
    useEffect(() => {
        setPasswordsMatch(password === passwordConfirmation);
    }, [password, passwordConfirmation, setPasswordsMatch]);

    const newHandlePasswordChange = (
        newPasswordEvent: ChangeEvent<HTMLInputElement>,
        updatePassword: React.Dispatch<React.SetStateAction<string>>
    ) => {
        newPasswordEvent.preventDefault();
        let newPassword = newPasswordEvent.target.value.trim()
        updatePassword(newPassword);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log("[UserInformationInput] handleSubmit");

        // check if password is empty
        if (!password) {
            triggerAlert("Please specify a password.");
            return;
        }

        // check password strength
        if (passwordStrength <= REQUIRED_PASSWORD_STRENGTH) {
            triggerAlert("Password is not strong enough");
            return;
        }

        // check if passwords match
        if (!passwordsMatch) {
            triggerAlert("Password is not strong enough");
            return;
        }

        submitFunction({
            username: username,
            password: password,
        });
    };

    const parsePasswordStrengthFeedback = (
        score: number,
        feedback: PasswordFeedback
    ) => {
        console.log(score);
        console.log(feedback);

        setPasswordStrength(score);

        if (feedback.warning) {
            // TODO: add some warning or hint
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type={"name"}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </FormGroup>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Must contain one number, uppercase & lowercase letter each"
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        newHandlePasswordChange(event, setPassword)
                    }
                />
                <PasswordStrengthBarWrapper
                    currentPassword={password}
                    scoreChangeCallback={(score, feedback) =>
                        parsePasswordStrengthFeedback(score, feedback)
                    }
                />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Re-enter password</Form.Label>
                <Form.Control
                    type="password"
                    value={passwordConfirmation}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        newHandlePasswordChange(event, setPasswordConfirmation)
                    }
                />
                <RuleChecker
                    ruleToCheck={passwordStrength >= REQUIRED_PASSWORD_STRENGTH}
                    ruleDesc={"Passwords must be at least strong."}
                    imageAlt={"status icon password length"}
                />
                <div>
                    <img
                        alt={"status icon passwords match"}
                        src={
                            !passwordConfirmation
                                ? info_svg
                                : passwordsMatch
                                    ? check_svg
                                    : error_svg
                        }
                    />
                    <span className={"sr-only"}>
                        {passwordsMatch ? "Done: " : "Missing: "}
                    </span>
                    <span
                        className={
                            !passwordConfirmation
                                ? "text-muted"
                                : passwordsMatch
                                    ? "text-success"
                                    : "text-danger"
                        }
                    >
                        Passwords must match.
                    </span>
                </div>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
