import React, {ReactElement} from "react";
import {Container, Row, Button} from "react-bootstrap";

export default function Profile(): ReactElement {
    const user = {
        name: "Gimleux",
        groups: ["FAMILY", "ADMIN"]
    };

    return (
        <Container className="page-content">
            <Container fluid>
                <Row className="title-action mt-1">
                    <h1 className="mr-1 h4">
                        My Profile
                    </h1>
                    <Button>Edit Informations</Button>
                </Row>
            </Container>

            <Container className="profile-information-display p-0">
                <h2 className="h3 pt-3 pb-3">
                    {user.name}
                </h2>
                <dl>
                    <dt>Username</dt>
                    <dd>{user.name}</dd>
                    <dt>Groups</dt>
                    <dd>{user.groups.map((group: string) => {
                        return group + " "
                    })}
                    </dd>
                </dl>
            </Container>
        </Container>
    );
}