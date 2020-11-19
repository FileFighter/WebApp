import React, {ReactElement, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux'
import {addAccessToken, addRefreshToken} from "../background/redux/actions/tokens";
import {SystemState} from "../background/redux/actions/sytemState";
import {Button} from "react-bootstrap";


// this takes the redux store and maps everything that is needed to the function props
const mapState = (state: SystemState) => ({
    tokens: {refreshToken: state.tokens.refreshToken, accessToken: state.tokens.accessToken}
})

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addRefreshToken, addAccessToken
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// this defines the component props and also adds the redux imported props
type Props = PropsFromRedux & {}

function App(props: Props): ReactElement {


    console.log(props.tokens.refreshToken)
    console.log(props.tokens)


    return (
        <div className="App">
            <Button onClick={() => props.addAccessToken({token:"bva",timestamp:1243})}>test (look in the console)</Button>
            <Button onClick={() => props.addRefreshToken("bgsgfhz")}>Refreshtoken (look in the console)</Button>
        </div>
    );
}

export default connector(App);
