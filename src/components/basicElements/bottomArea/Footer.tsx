import React, { ReactElement } from "react"
import { Container } from "react-bootstrap"
import github from "super-tiny-icons/images/svg/github.svg"

export default function Footer(): ReactElement {
    return (
        <footer className="footer mt-autotext-white bg-primary">
            <Container className="d-flex flex-column justify-content-center p-0">
                <span className="align-self-center mt-2">
                    <a
                        href={"https://github.com/filefighter"}
                        className="text-white"
                    >
                        FileFighter&#160;
                        <img src={github} alt={"github logo"} height="16px" />
                    </a>{" "}
                    is made with &lt;3 by
                </span>
                <div className="d-flex justify-content-around">
                    <span>
                        <a
                            href="https://github.com/Gimleux"
                            className="text-white"
                        >
                            Gimleux
                        </a>
                    </span>
                    <span>
                        <a
                            href="https://github.com/open-schnick"
                            className="text-white"
                        >
                            Open-Schnick
                        </a>
                    </span>
                    <span>
                        <a
                            href="https://github.com/qvalentin"
                            className="text-white"
                        >
                            qvalentin
                        </a>
                    </span>
                </div>
            </Container>
        </footer>
    )
}
