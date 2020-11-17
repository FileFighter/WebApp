import React, {ReactElement, useEffect, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux'
import {addRefreshToken} from "../background/redux/actions";
import {SystemState} from "../background/redux/actionTypes";




const mapState = (state: SystemState) => ({
    tokens:{refreshToken:null,accessToken:null}
})

const mapDispatch = {
    addRefreshToken
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
    backgroundColor: string
}

function App():ReactElement {


    return (
        <div className="App">

        </div>
    );
}

export default connector(App);
