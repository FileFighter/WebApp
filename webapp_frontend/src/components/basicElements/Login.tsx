import React, {FormEvent, ReactElement, useState} from 'react';
import {Button, Form, Container, Row,Col} from "react-bootstrap";
import {loginWithUsernameAndPassword} from "../../background/api/auth";


function Login(): ReactElement {
    const [userName, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        loginWithUsernameAndPassword(userName, password,stayLoggedIn)
            .then(() => {
                //nothing to do here :)
                setErrorMessage("");
            })
            .catch(((error) => {
                console.log(error);

                setErrorMessage(error.response?.data.message);
            }))


    };


    return (
        <Container>
            <Row >
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" value={userName} onChange={event => setUsername(event.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                            <Form.Text className="text-muted">
                                Contact your administrator if you have forgotten your password.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" onChange={() => setStayLoggedIn(!stayLoggedIn)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <p className="text-danger">{errorMessage}</p>
                    </Form>
                </Col>
            </Row>
        </Container>);
}

export default Login;
