import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

interface Props {
    needsLogin?: boolean;
}

export default function Error400({ needsLogin }: Props) {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const dest = urlSearchParams.get("dest");
    const message = urlSearchParams.get("message");

    const tryAgainUrl = needsLogin ? (
        <Link to={"/login?dest=" + dest}>Try again</Link>
    ) : (
        <a href={decodeURIComponent(dest ?? "")}> Try again </a> // a tag because we are leaving the spa
    );

    return (
        <Container className={"text-center"}>
            <h2>Something went wrong!</h2>
            <h3>The file could not be loaded</h3>
            {message && <h4>{message}</h4>}
            {tryAgainUrl && <p></p>}
            <Link to="/">Go to Home</Link>
            {tryAgainUrl}
        </Container>
    );
}
