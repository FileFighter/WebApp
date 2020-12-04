import React, {ReactElement} from 'react';
import {Container} from 'react-bootstrap';
import github from "super-tiny-icons/images/svg/github.svg"

export default function Footer(): ReactElement {
    return (
        <Container>
            <div className="d-flex flex-column justify-content-center">
                <a href={"https://github.com/filefighter"} className="align-self-center"><img src={github} alt={"github logo"} width={"50px"}/></a>
                <span className="align-self-center mt-2" >Made by</span>
                <div className="d-flex justify-content-around">
                    <span>Gimleux</span>
                    <span>Open-Schnick</span>
                    <span>qvalentin</span>
                </div>
            </div>
        </Container>
    );
}

