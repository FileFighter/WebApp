import React, {ReactElement, useEffect, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux'
import {addAccessToken, addRefreshToken} from "../background/redux/actions";
import {SystemState} from "../background/redux/actionTypes";
import {Button} from "react-bootstrap";



// this takes the redux store and maps everything that is needed to the function props
const mapState = (state: SystemState) => ({
    tokens:{refreshToken:state.tokens.refreshToken,accessToken:state.tokens.accessToken}
})

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addRefreshToken,addAccessToken
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// this defines the component props and also adds the redux imported props
type Props = PropsFromRedux & {

}

function App(props: Props):ReactElement {


if (props.tokens.refreshToken) {
    console.log(props.tokens.refreshToken)
    console.log(props.tokens)
    console.log(1)
}


    return (
        <div className="App">
            <Button onClick={()=>props.addRefreshToken(12433)}>test</Button>
        </div>
    );
}

export default connector(App);
