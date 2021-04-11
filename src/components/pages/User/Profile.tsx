import React, {ReactElement, useState} from "react";
import {Alert, Button, Container, Row} from "react-bootstrap";
import {changeUserInformation} from "../../../background/api/userInformations";
import UserInformationInput, {UserInformationInterface} from "./UserInformationInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../background/redux/store";


export default function Profile(): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);
    const [newUser, setNewUser] = useState<UserInformationInterface>({
        username: "",
        password: "",
        passwordConfirmation: ""
    })
    const [alertMessage, setAlertMessage] = useState<string>("Error 404: No Message found.");
    const [alertVariant, setAlertColor] = useState<"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark">("success");
    const [alertVisibility, setAlertVisibility] = useState<boolean>(false);

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

    function changeEditMode(): void {
        console.log("[PROFILE] changedEditMode")
        setIsEditing(!isEditing)
    }

    const handleSubmit = () => {
        console.log("[PROFILE] handleSubmit")
        //console.log(changeUserInformation(newUser))
        changeEditMode()
    }

    /*function EditProfile(): ReactElement {
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
    }*/

    function EditProfile(): ReactElement {
        return (
            <>
                <UserInformationInput triggerAlert={handleAlertVisibility} submitFunction={handleSubmit}
                                      newUser={newUser} setNewUser={setNewUser}/>
                <Alert variant={alertVariant} onClose={() => setAlertVisibility(false)} show={alertVisibility}
                       dismissible>
                    <p>{alertMessage}</p>
                </Alert>
            </>
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
                    {isEditing ? <></> : <Button onClick={changeEditMode} disabled={isEditing}>{isEditing ? "Editing" : "Edit Information"}</Button>}
                </Row>
            </Container>
            {isEditing ? <EditProfile/> : <DisplayProfile/>}

        </Container>
    );
}
