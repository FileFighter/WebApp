import React, {ReactElement, useState} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootState} from "../../../background/redux/store";


export default function Profile(): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);

    function handleEditModeChange(): void {
        console.log("[PROFILE] hi")
        setIsEditing(!isEditing)
    }

    function EditProfile(): ReactElement {
        return (
            <Form>
                <Form.Group controlId="editProfileForm.Username">
                    <Form.Label>Your Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={user.username ?? ""}/>
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
                    <dd>{user.groups.map((value: number, index: number, array: number[]) => {
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