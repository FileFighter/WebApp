import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { redirect } from "../../background/methods/redirect";
import logo from "../../assets/images/logos/logo.png";
import { Container, Nav, Navbar, NavbarBrand, NavDropdown } from "react-bootstrap";
import { SystemState } from "../../background/redux/actions/sytemState";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "../../background/api/auth";

export interface navBarElement_Interface {
    name: string;
    text: string;
    link: string;
    deviantVisibleLink?: string;
    logo: string | null;
    onClick?: (...sth: any) => any;
}

const mapState = (state: SystemState) => ({
    username: state.user.username
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header(props: PropsFromRedux): ReactElement {
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
            logo: null
        },
        {
            name: "registration",
            text: "Registration",
            link: "/registration",
            logo: null
        }
    ];

    const final: ReactElement[] = [];
    navBarElements.forEach((element) => {
        final.push(
            <Nav.Link
                className="nav-link nav-item"
                key={"navBarElement-" + element.name}
                href={element.deviantVisibleLink ?? element.link}
                onClick={(event: any) => {
                    redirect(history, element.link, event);
                    if (element.onClick) element.onClick();
                }}
            >
                <span />
                <span className="navbar-link-description">{element.text}</span>
            </Nav.Link>
        );
    });

    return (
        <header>
            <Navbar bg="primary" expand="lg" sticky="top">
                <Container>

                    <NavbarBrand
                        href="/start"
                        onClick={(event: any) => {
                            redirect(history, "/", event);
                        }}
                    >
                        <img
                            src={logo}
                            className="d-inline-block align-top"
                            alt="Logo"
                            height="30px"
                            width="auto"
                        />
                        FileFighter
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {props.username && (
                            <Nav className="navbar-collapse justify-content-end">
                                {final}
                                <NavDropdown title={props.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        href="/profile"
                                        onClick={(event: any) => {
                                            redirect(history, "/profile", event);
                                        }}
                                    >
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={(event: any) => {
                                            logout();
                                        }}
                                    >
                                        Logout1
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
        ;
}

export default connector(Header);
