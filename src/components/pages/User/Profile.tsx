import React, {ChangeEvent, ReactElement, useState} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootState} from "../../../background/redux/store";
import {changeUserInformation} from "../../../background/api/userInformations";
import {notMinStrLength} from "../../../background/methods/checkInput";


export default function Profile(): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
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

    function handleEditModeChange(): void {
        if (isEditing) {
            let newUser = JSON.parse(JSON.stringify(user))
            let usernameInput = document.getElementById("editProfileForm-Username")
            if (usernameInput) {
                console.log((usernameInput as HTMLInputElement).value)
                newUser.username = (usernameInput as HTMLInputElement).value
                console.log(changeUserInformation(newUser))
            }
        } else {
            console.log("[PROFILE] changedEditMode")
            setIsEditing(!isEditing)
        }
    }

    function EditProfile(): ReactElement {
        return (
            <Form>
                <Form.Group controlId="editProfileForm-Username">
                    <Form.Label>Your Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" defaultValue={user.username ?? ""}/>
                    <Form.Text>
                        Your username will be visible to anyone using this system.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="editProfileForm.Password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password"/>
                </Form.Group>
                <Form.Group controlId="editProfileForm.PasswordConfirmation">
                    <Form.Label>Repeat new Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password"/>
                </Form.Group>
            </Form>
        )
    }

    function DisplayProfile(): ReactElement {
        return (
            <Container className="profile-information-display p-0">
                <h2 className="h3 pb-3">
                    {user.username}
                </h2>
                <dl>
                    <dt>Username</dt>
                    <dd>{user.username}</dd>
                    <dt>Groups</dt>
                    <dd>{user.groups.map((value: number) => {
                        return value + " "
                    })}
                    </dd>
                </dl>
            </Container>
        )
    }

    return (
        <Container className="page-content">
            <Container fluid className=" mt-1 mb-3">
                <Row className="title-action">
                    <h1 className="mr-1 h4">
                        My Profile
                    </h1>
                    <Button onClick={handleEditModeChange}>{isEditing ? "Save Changes" : "Edit Informations"}</Button>
                </Row>
            </Container>
            {isEditing ? <EditProfile/> : <DisplayProfile/>}

        </Container>
    );
}