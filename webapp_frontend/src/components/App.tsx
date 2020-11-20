import React, {ReactElement} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import Header from "./basicElements/Header";
import Footer from "./basicElements/Footer";
import {BrowserRouter} from "react-router-dom";
import Router from "./Router/Router";
import PermanentAssets from "./basicElements/PermanentAssets";


import {connect, ConnectedProps} from 'react-redux'
import {addAccessToken, addRefreshToken} from "../background/redux/actions/tokens";
import {SystemState} from "../background/redux/actions/sytemState";


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


    console.log("[App] props.tokens: ")
    console.log(props.tokens.refreshToken)
    console.log(props.tokens)


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
    );
}

export default connector(App);
