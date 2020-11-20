import React, {ReactElement, useState} from 'react';
import {Button, Form, Container} from "react-bootstrap";


type Props =  {}

export default function Login(props: Props): ReactElement {
    const [userName, SetUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [stayLoggedIn,setStayLoggedIn] =useState<boolean>(false);




    return (
        <Container>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"  onChange={()=>setStayLoggedIn(!stayLoggedIn)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>);
}

