import React, {Props, ReactElement, useState} from "react";
import {Container} from "react-bootstrap";
import {genitiveOfWord} from "../../../background/methods/grammar/germanGrammar";
import {SystemState} from "../../../background/redux/actions/sytemState";

export default function Profile() : ReactElement {

    return (
        <Container>
            <h2>
                Profile
            </h2>
        </Container>
    );
}