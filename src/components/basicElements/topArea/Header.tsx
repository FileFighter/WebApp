import React, {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../../../assets/images/logos/logo.png";
import {Container, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import {SystemState} from "../../../background/redux/actions/sytemState";
import {connect, ConnectedProps} from "react-redux";
import {logout} from "../../../background/api/auth";

export interface navBarElement_Interface {
    name: string;
    text: string;
    link: string;
    deviantVisibleLink?: string;
    logo: string | null;
    onClick?: (...sth: any) => any;
}

const mapState = (state: SystemState) => ({
    username: state.user.username,
    groups: state.user.groups
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header(props: PropsFromRedux): ReactElement {
    const navigate = useNavigate();
    const navBarElements: navBarElement_Interface[] = [
        {
            name: "health",
            text: "Health",
            link: "/health",
            deviantVisibleLink: "/health",
            logo: null
        },
        {
            name: "files",
            text: "Files",
            link: "/file",
            logo: null
        }
    ];

    if (props.groups.includes("ADMIN")) {
        navBarElements.push({
            name: "registration",
            text: "Registration",
            link: "/registration",
            logo: null
        });
    }
    const final: ReactElement[] = [];
    navBarElements.forEach((element) => {
        final.push(
            <Nav.Link
                className="nav-link nav-item"
                key={"navBarElement-" + element.name}
                onClick={(event: any) => {
                    navigate(element.link);
                    if (element.onClick) element.onClick();
                }}
            >
                <span/>
                <span className="navbar-link-description">{element.text}</span>
            </Nav.Link>
        );
    });

    return (
        <header>
            <Navbar bg="primary" expand="lg" sticky="top" collapseOnSelect>
                <Container>
                    <NavbarBrand
                        onClick={(event: any) => {
                            navigate("/file");
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
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {props.username && (
                            <Nav className="navbar-collapse justify-content-end">
                                {final}
                                <NavDropdown
                                    title={props.username}
                                    id="basic-nav-dropdown"
                                    className="text-center"
                                >
                                    <NavDropdown.Item
                                        onClick={(event: any) => {
                                            navigate(
                                                "/profile",
                                            );
                                        }}
                                    >
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={(event: any) => {
                                            logout();
                                        }}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default connector(Header);
