import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Container } from "react-bootstrap"

/**
 * Props for Error 400 page
 * @param {boolean} [needsLogin] is user not logged-in?
 */
export interface Error400Props {
    needsLogin?: boolean
}

/**
 * FileFighter's HTTP 400 Error Page
 * @param needsLogin Does user need new login?
 * @returns Error 400 page
 */
export default function Error400({ needsLogin }: Error400Props) {
    const location = useLocation()
    const urlSearchParams = new URLSearchParams(location.search)
    const dest = urlSearchParams.get("dest")
    const message = urlSearchParams.get("message")

    let tryAgainUrl
    if (dest) {
        tryAgainUrl = needsLogin ? (
            <Link to={"/login?dest=" + encodeURIComponent(dest)}>
                Try again
            </Link>
        ) : (
            <a href={decodeURIComponent(dest)}> Try again </a> // a tag because we are leaving the spa
        )
    }
    return (
        <Container className={"text-center"}>
            <h2 className={"text-danger"}>Something went wrong!</h2>
            <h3 className="text-danger"> The file could not be loaded</h3>
            {message && <h4>{message}</h4>}
            {tryAgainUrl && tryAgainUrl}
            <p>
                <Link to="/">Go to Home</Link>
            </p>
        </Container>
    )
}
