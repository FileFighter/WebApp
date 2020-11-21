import React, {ReactElement, useEffect, useState} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import Header from "./basicElements/Header";
import Footer from "./basicElements/Footer";
import {BrowserRouter} from "react-router-dom";
import Router from "./Router/Router";
import PermanentAssets from "./basicElements/PermanentAssets";


import {connect, ConnectedProps} from 'react-redux'
import {addAccessToken, addRefreshToken,checkedCookies} from "../background/redux/actions/tokens";
import {SystemState} from "../background/redux/actions/sytemState";
import {Button} from "react-bootstrap";
import Login from "./basicElements/Login";


// this takes the redux store and maps everything that is needed to the function props
const mapState = (state: SystemState) => ({
    tokens: {refreshToken: state.tokens.refreshToken, accessToken: state.tokens.accessToken,checkedCookies:state.tokens.checkedCookies},
    user: state.user
})

// this takes the redux actions and maps them to the props
const mapDispatch = {
    addRefreshToken, addAccessToken,checkedCookies
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

// this defines the component props and also adds the redux imported props
type Props = PropsFromRedux & {}

function App(props: Props): ReactElement {


    console.log(props.tokens.refreshToken)
    console.log(props.tokens)

if (props.tokens.checkedCookies){

    if (props.tokens.refreshToken){

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Container>
                    <Router/>
                </Container>
                <Footer/>
                <PermanentAssets/>
            </BrowserRouter>
        </div>
    );}

    else {
        console.log("[APP] showing login");
        return (<Login/>)
        }
}
    else {
        props.checkedCookies(true)

    return (<div>Loading</div>)
}
}

export default connector(App);
