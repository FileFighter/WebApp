import React, {ReactElement, useState} from "react";
import {Alert, Button, Container} from "react-bootstrap";
import UserInformationInput, {UserInformationInputInterface} from "./UserInformationInput";
import {useSelector} from "react-redux";
import {RootState} from "../../../background/redux/store";
import {DEFAULT_ALERT_DURATION, MIN_PASSWORD_LENGTH} from "../../../background/constants";
import {changeUserInformation, UserInformation} from "../../../background/api/userInformation";
import {notMinStrLength} from "../../../background/methods/checkInput";
import edit_svg from "../../../assets/images/icons/material.io/edit_white_24dp.svg";


export default function Profile(): ReactElement {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);
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

    const handleSubmit = async (inputUser: UserInformationInputInterface) => {
        console.log("[PROFILE] handleSubmit")
        let newUser: UserInformation = {
            groups: user.groups,
            userId: user.userId
        }
        if (!inputUser.username) {
            handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Please choose an username.")
            // } else if (inputUser.password !== inputUser.passwordConfirmation) {
            //     handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Password and password confirmation must match.")
            // } else if (inputUser.password.match(/\d/) == null || inputUser.password.match(/[a-z]/) == null || inputUser.password.match(/[A-Z]/) == null || notMinStrLength(inputUser.password, MIN_PASSWORD_LENGTH)) {
            //     handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Please pay attention to the notes below the input fields.")
            return;
        }
        newUser["username"] = inputUser.username;
        if (inputUser.password || inputUser.passwordConfirmation) {
            if (inputUser.password !== inputUser.passwordConfirmation) {
                handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Password and password confirmation must match.")
                return;
            }
            if (inputUser.password.match(/\d/) == null || inputUser.password.match(/[a-z]/) == null || inputUser.password.match(/[A-Z]/) == null || notMinStrLength(inputUser.password, MIN_PASSWORD_LENGTH)) {
                handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: Please pay attention to the notes below the input fields.")
                return;
            }
            newUser["password"] = inputUser.password
            newUser["confirmationPassword"] = inputUser.passwordConfirmation
        }

        await changeUserInformation(newUser)
            .then(res => {
                changeEditMode()
                handleAlertVisibility(DEFAULT_ALERT_DURATION, "success", "Worked: " + (res));
            })
            .catch(err => {
                console.log("Error:" + err)
                handleAlertVisibility(DEFAULT_ALERT_DURATION, "danger", "Error: " + err)
            })
    }

    function EditProfile(): ReactElement {
        return (
            <>
                <UserInformationInput
                    triggerAlert={handleAlertVisibility}
                    submitFunction={handleSubmit}
                    presets={{username: user.username ?? "", password: ""}}
                />
                <Alert variant={alertVariant} onClose={() => setAlertVisibility(false)} show={alertVisibility}
                       dismissible>
                    <p>{alertMessage}</p>
                </Alert>
            </>
        )
    }

    function DisplayProfile(): ReactElement {
        return (
            <div className="profile-information-display p-0 w-100">
                <h2 className="h3 pb-3">
                    {user.username}
                </h2>
                <dl>
                    <dt>Username</dt>
                    <dd>{user.username}</dd>
                    <dt>Groups</dt>
                    <dd>{user.groups?.map((value: number) => {
                        return value + " "
                    })}
                    </dd>
                </dl>
            </div>
        )
    }

    return (
        <Container className="page-content">
            <div className="px-1 w-100 mt-1 mb-3 ">
                <div className="w-100 title-action">
                    <h1 className="mr-1 h4">
                        My Profile
                    </h1>
                    <Button
                        onClick={changeEditMode}
                    >
                        {!isEditing && <img src={edit_svg} alt={"edit icon"} className="pr-2"/>}
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>
            </div>
            {isEditing ? <EditProfile/> : <DisplayProfile/>}
        </Container>
    );
}
