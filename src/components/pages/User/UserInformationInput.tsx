import React, {
    ChangeEvent,
    FormEvent,
    ReactElement,
    useCallback,
    useEffect,
    useState,
    Suspense
} from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import check_svg from "../../../assets/images/icons/material.io/check_circle-24px.svg";
import info_svg from "../../../assets/images/icons/material.io/info-24px.svg";
import error_svg from "../../../assets/images/icons/material.io/error-24px.svg";
import {
    biggerMaxStrLength,
    notMinStrLength
} from "../../../background/methods/checkInput";
import { deleteSpaces } from "../../../background/methods/dataTypes/strings";
import {
    DEFAULT_ALERT_DURATION,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH
} from "../../../background/constants";

// lazy load the lib
const PasswordStrengthBar = React.lazy(() => import("react-password-strength-bar"));

export interface UserInformationInputInterface {
    username: string;
    password: string;
    passwordConfirmation?: string;
}

type UserInformationInputProps = {
    triggerAlert(
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
    ): void;
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
    const [passwordInformationLength, setPasswordInformationLength] =
        useState<boolean>(false);
    const [passwordInformationLowercase, setPasswordInformationLowercase] =
        useState<boolean>(false);
    const [passwordInformationUppercase, setPasswordInformationUppercase] =
        useState<boolean>(false);
    const [passwordInformationNumber, setPasswordInformationNumber] =
        useState<boolean>(false);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    const reviewPasswordMatch = useCallback((): void => {
        setPasswordsMatch(password === passwordConfirmation);
    }, [password, passwordConfirmation]);

    useEffect(() => {
        reviewPasswordMatch();
    }, [reviewPasswordMatch]);

    const checkPasswordRules = (input: string): boolean => {
        input = deleteSpaces(input);
        if (biggerMaxStrLength(input, MAX_PASSWORD_LENGTH)) {
            triggerAlert(
                DEFAULT_ALERT_DURATION,
                "warning",
                "Maximum password length exceeded. Input was undone."
            );
            return false;
        }
        return true;
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let newPassword: string = event.target.value;

        let isOK = checkPasswordRules(newPassword);
        // if the password does not match the rules, do not change it.
        if (!isOK) {
            newPassword = password;
        }
        setPasswordInformationLength(
            !notMinStrLength(newPassword, MIN_PASSWORD_LENGTH)
        );
        setPasswordInformationLowercase(newPassword.match(/[a-z]/) !== null);
        setPasswordInformationUppercase(newPassword.match(/[A-Z]/) !== null);
        setPasswordInformationNumber(newPassword.match(/\d/) !== null);
        setPassword(newPassword);
    };

    const handlePasswordConfirmationChange = async (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault();
        let newConfirmationPassword: string = event.target.value;
        const isOK = checkPasswordRules(newConfirmationPassword);
        // if the confirmationPassword does not match the rules do not change it
        if (!isOK) {
            newConfirmationPassword = passwordConfirmation;
        }
        setPasswordConfirmation(newConfirmationPassword);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log("[UserInformationInput] handleSubmit");
        reviewPasswordMatch();
        let newUser = {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        };
        submitFunction(newUser);
    };

    // inner component rendering the checks
    type RuleCheckerProps = {
        ruleToCheck: boolean;
        ruleDesc: string;
        imageAlt: string;
    };
    const RuleChecker = ({
        ruleToCheck,
        ruleDesc,
        imageAlt
    }: RuleCheckerProps): JSX.Element => {
        return (
            <div>
                <img alt={imageAlt} src={ruleToCheck ? check_svg : info_svg} />
                <span className={"sr-only"}>
                    {ruleToCheck ? "Done: " : "Missing: "}
                </span>
                <span className={ruleToCheck ? "text-success" : "text-muted"}>
                    {ruleDesc}
                </span>
            </div>
        );
    };

    // a small component wrapping the password strength checks by lazy loading the component if necessary.
    type PasswordStrengthBarWrapperArgs = {
        currentPassword: string
    }
    const PasswordStrengthBarWrapper = ({ currentPassword }: PasswordStrengthBarWrapperArgs): JSX.Element | null => {
        // if the user typed something show the component
        if (currentPassword.length > 0) {
            return (
                <Suspense fallback={""}>
                    <PasswordStrengthBar password={password} />
                </Suspense>
            )
        } else {
            return null;
        }
    }

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
                        handlePasswordChange(event)
                    }
                />
                <PasswordStrengthBarWrapper currentPassword={password} />
                <RuleChecker
                    ruleToCheck={passwordInformationLength}
                    ruleDesc={"Passwords must be between 8 and 20 characters."}
                    imageAlt={"status icon password length"}
                />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
                <Form.Label>Re-enter password</Form.Label>
                <Form.Control
                    type="password"
                    value={passwordConfirmation}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handlePasswordConfirmationChange(event)
                    }
                />
                <PasswordStrengthBarWrapper currentPassword={passwordConfirmation} />
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
