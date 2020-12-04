import React, {ReactElement} from 'react';
import { useHistory } from "react-router-dom";
import {Button} from "react-bootstrap";

function Header():ReactElement {
    const history = useHistory();

    return(<div><Button onClick={() => history.push("/registration")}>Registration</Button><Button onClick={() => history.push("/")}>Main</Button><Button onClick={() => history.push("/file")}>Files</Button></div>)
}

export default Header;