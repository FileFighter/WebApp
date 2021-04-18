import React, {FormEvent, ReactElement, useState} from 'react';
import {Button, Form, Container, Row,Col,Spinner, Image} from "react-bootstrap";
import {loginWithUsernameAndPassword} from "../../background/api/auth";

import logo from "../../assets/images/logos/logoWithWhiteBorder.png";

function Login(): ReactElement {
    const [userName, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true)
        loginWithUsernameAndPassword(userName, password,stayLoggedIn)
            .then(() => {
                //nothing to do here :)
                setErrorMessage("");
                setLoading(false);
            })
            .catch(((error) => {
                console.log(error);
                setLoading(false)
                setErrorMessage(error.response?.data.message);
            }))


    };


    return (
        <Container  className="h-100">
            <Container fluid className="login-container">

            <Container>
                <Row className="justify-content-md-center">
                    <Image rounded src={logo} height="200px" width="auto"/>
                </Row>
                <Row className="justify-content-md-center">
                    <h1>Greetings Traveller!</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <h2>Be welcome at FileFighter</h2>
                </Row>
            </Container>

            <Row className="mt-4">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Control placeholder="Username" value={userName} onChange={event => setUsername(event.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                            <Form.Text className="text-muted">
                                Contact your administrator if you have forgotten your login details.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" block>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className={loading? "" :"d-none"}
                            />   <span className={loading? "sr-only" :"d-none"}>Loading...</span>Sign in
                        </Button>
                        <Form.Group controlId="formBasicCheckbox" className="mt-3 justify-content-center">
                            <Form.Check checked={stayLoggedIn} type="checkbox" label="Keep me signed in*" onChange={() => setStayLoggedIn(!stayLoggedIn)}/>
                            <Form.Text className="text-muted">
                                *By clicking this, you accept the usage of cookies.
                            </Form.Text>
                        </Form.Group>
                        <p className="text-danger">{errorMessage}</p>
                    </Form>
                </Col>
            </Row>
            </Container>
        </Container>);
}

export default Login;
