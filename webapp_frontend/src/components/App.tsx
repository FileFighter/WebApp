import React, {ReactElement, useEffect, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux'
import {addAccessToken, addRefreshToken} from "../background/redux/actions";
import {SystemState} from "../background/redux/actionTypes";
import {Button} from "react-bootstrap";




const mapState = (state: SystemState) => ({
    tokens:{refreshToken:state.tokens.refreshToken,accessToken:state.tokens.accessToken}
})

const mapDispatch = {
    addRefreshToken,addAccessToken
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}

function App(props: Props):ReactElement {



    console.log(props.tokens.refreshToken)



    return (
        <div className="App">
            <Button onClick={()=>props.addRefreshToken(12433)}>test</Button>
        </div>
    );
}

export default connector(App);
