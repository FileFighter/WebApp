import React, {FormEvent, ReactElement, useState} from 'react';
import {Button, Form, Container} from "react-bootstrap";
import user from "../../background/redux/reducers/user";
import {loginWithUsernameAndPassword} from "../../background/api/login";
import {addAccessToken, addRefreshToken, checkedCookies} from "../../background/redux/actions/tokens";
import {connect, ConnectedProps} from "react-redux";
import {SystemState} from "../../background/redux/actions/sytemState";
import {addUser} from "../../background/redux/actions/user";

//why is this needed? because connect needs this?
const mapState = (state: SystemState) => ({})

const mapDispatch = {
    addRefreshToken,
    addUser
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// this defines the component props and also adds the redux imported props
type Props = PropsFromRedux & {}


function Login(props: Props): ReactElement {
    const [userName, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        loginWithUsernameAndPassword(userName, password)
            .then(backendLoginData => {
                props.addRefreshToken(backendLoginData.refreshToken);
                props.addUser(backendLoginData.user)
            });

    };


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username" value={userName} onChange={event => setUsername(event.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" onChange={() => setStayLoggedIn(!stayLoggedIn)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>);
}

export default connector(Login);
