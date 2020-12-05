import React, {ReactElement} from 'react';
import {useHistory} from "react-router-dom";
import {redirect} from "../../background/methods/redirect";
import logo from "../../assets/images/logos/logo.png"
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";

export interface navBarElement_Interface {
    name: string,
    text: string,
    link: string,
    deviantVisibleLink?: string,
    logo: string | null,
    onClick?: (...sth: any) => any,
}

function Header(): ReactElement {
    const history = useHistory();
    const navBarElements: navBarElement_Interface[] = [
        {
            name: "main",
            text: "Main",
            link: "/",
            deviantVisibleLink: "/start",
            logo: null
        },
        {
            name: "files",
            text: "Files",
            link: "/file",
            logo: null,
        },
        {
            name: "registration",
            text: "Registration",
            link: "/registration",
            logo: null,
        }
    ]

    const final: ReactElement[] = []
    navBarElements.forEach((element) => {
        final.push(
            <Nav.Link
                className="nav-link nav-item"
                key={"navBarElement-" + element.name}
                href={element.deviantVisibleLink ?? element.link}
                onClick={(event: any) => {
                    redirect(history, element.link, event);
                    if (element.onClick) element.onClick()
                }}
            ><span/><span className="navbar-link-description">{element.text}</span></Nav.Link>
        )
    })

    return (
        <header>
            <div className="container">
                <Navbar bg="primary" expand="lg" sticky="top">
                    <NavbarBrand href="/start" onClick={(event: any) => {redirect(history, "/", event);}}>
                        <img src={logo} className="d-inline-block align-top" alt="Logo" height="30px" width="auto"/>
                        FileFighter
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-collapse justify-content-end">
                            {final}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}

export default Header;
