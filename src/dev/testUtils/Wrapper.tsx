import React from "react"
import { BrowserRouter } from "react-router-dom"
import store from "../../background/redux/store"
import { Provider } from "react-redux"

/**
 * It's a function that takes in children and returns a Redux Provider component that wraps a BrowserRouter component that wraps
 * the given children
 * @param {ReactElement} children
 * @returns The Provider component is being returned.
 */
export const Wrapper: React.FC = ({ children }) => {
    return (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    )
}
