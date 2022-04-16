import React from "react"
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

/**
 * FileFighter's HTTP 404 Error Page
 * @returns Error 404 page
 */
export default function Error404() {
    return (
        <Container>
            <p className={"text-center"}>
                <Link to="/">Go to Home </Link>
            </p>
        </Container>
    )
}
