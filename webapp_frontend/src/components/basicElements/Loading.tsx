import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";

export function FFLoading(): JSX.Element {
  return (
    <Container
      className={"d-flex justify-content-center align-items-center h-100"}
    >
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
}
