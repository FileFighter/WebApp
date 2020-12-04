import React, {ReactElement} from 'react';
import {useHistory} from "react-router-dom";
import {redirect} from "../../background/methods/redirect";
import logo from "../../assets/images/logos/logo.png"

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
            name: "registration",
            text: "Registration",
            link: "/registration",
            logo: null,
        }
    ]

    const final: ReactElement[] = []
    navBarElements.forEach((element) => {
        final.push(
            <a
                className="nav-link nav-item"
                key={"navBarElement-" + element.name}
                href={element.deviantVisibleLink ?? element.link}
                onClick={(event) => {
                    redirect(history, element.link, event);
                    if (element.onClick) element.onClick()
                }}
            ><span/><span className="navbar-link-description">{element.text}</span></a>
        )
    })

    return (
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <a className="navbar-brand" href="/start" onClick={(event) => redirect(history, "/", event)}>
                        <img src={logo} className="d-inline-block align-top" alt="Logo" height="60px" width="auto"/>
                        FileFighter
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="navbar-nav">
                            {final}
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;