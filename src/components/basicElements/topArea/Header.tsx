import React, { ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/images/logos/logo.png"
import {
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
} from "react-bootstrap"
import { SystemState } from "../../../background/redux/actions/sytemState"
import { connect, ConnectedProps } from "react-redux"
import { logout } from "../../../background/api/auth"

export interface navBarElement_Interface {
    name: string
    text: string
    link: string
    logo: string | null
    onClick?: (...sth: any) => any
}

/**
 * It takes a SystemState object and returns an object with a username and groups property
 * @param {SystemState} state - this is the state of the entire system.
 */
const mapState = (state: SystemState) => ({
    username: state.user.username,
    groups: state.user.groups,
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

/**
 * It returns a header element containing the logo, project name and navigation menu
 * @param props
 * @return A header element with project details and navbar
 */
function Header(props: PropsFromRedux): ReactElement {
    const navigate = useNavigate()
    const navBarElements: navBarElement_Interface[] = [
        {
            name: "health",
            text: "Health",
            link: "/health",
            logo: null,
        },
        {
            name: "files",
            text: "Files",
            link: "/file",
            logo: null,
        },
    ]

    if (props.groups.includes("ADMIN")) {
        navBarElements.push({
            name: "registration",
            text: "Registration",
            link: "/registration",
            logo: null,
        })
    }
    const final: ReactElement[] = []
    navBarElements.forEach((element) => {
        final.push(
            <Nav.Link
                className="nav-link nav-item"
                key={"navBarElement-" + element.name}
                onClick={() => {
                    navigate(element.link)
                    if (element.onClick) element.onClick()
                }}
            >
                <span />
                <span className="navbar-link-description">{element.text}</span>
            </Nav.Link>
        )
    })

    return (
        <header>
            <Navbar bg="primary" expand="lg" sticky="top" collapseOnSelect>
                <Container>
                    <NavbarBrand
                        onClick={() => {
                            navigate("/file")
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
                                <NavDropdown
                                    title={props.username}
                                    id="basic-nav-dropdown"
                                    className="text-center"
                                >
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/profile")
                                        }}
                                    >
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            logout()
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
    )
}

export default connector(Header)
