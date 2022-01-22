import React, {
    Dispatch,
    FormEvent,
    ReactElement,
    SetStateAction,
    useEffect,
    useState,
} from "react"
import { Button, Col, Form, Image, Row, Spinner } from "react-bootstrap"
import { loginWithUsernameAndPassword } from "../../../background/api/auth"

import logo from "../../../assets/images/logos/logoWithWhiteBorder.png"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../../background/redux/store"

export interface LoginInputInterface {
    handleSubmit: (event: FormEvent) => void
    username: string | number | string[] | undefined
    setUsername: Dispatch<SetStateAction<string>>
    password: string | number | string[] | undefined
    setPassword: Dispatch<SetStateAction<string>>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    stayLoggedIn: boolean
    setStayLoggedIn: Dispatch<SetStateAction<boolean>>
    errorMessage: string | null
}

function Login(): ReactElement {
    const [userName, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const location = useLocation()
    const urlSearchParams = new URLSearchParams(location.search)
    const dest = urlSearchParams.get("dest")
    const navigate = useNavigate()

    const tokens = useSelector((state: RootState) => state.tokens)

    useEffect(() => {
        if (tokens.refreshToken && tokens.accessToken?.token) {
            if (dest) {
                navigate(decodeURIComponent(dest))
            } else {
                navigate("/")
            }
        }
    }, [dest, navigate, tokens])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        loginWithUsernameAndPassword(userName, password, stayLoggedIn)
            .then(() => {
                //nothing to do here :)
                setErrorMessage("")
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                setErrorMessage(error.response?.data.message)
            })
    }

    return (
        <LoginInteractionArea
            handleSubmit={handleSubmit}
            username={userName}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            stayLoggedIn={stayLoggedIn}
            setStayLoggedIn={setStayLoggedIn}
            errorMessage={errorMessage}
        />
    )
}

export function LoginInteractionArea(props: LoginInputInterface) {
    const {
        handleSubmit,
        username,
        setUsername,
        password,
        setPassword,
        isLoading,
        setIsLoading,
        stayLoggedIn,
        setStayLoggedIn,
        errorMessage,
    } = props
    return (
        <LoginInput
            handleSubmit={handleSubmit}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            stayLoggedIn={stayLoggedIn}
            setStayLoggedIn={setStayLoggedIn}
            errorMessage={errorMessage}
        />
    )
}

export function LoginHeader() {
    return (
        <div className="login-intro">
            <Row className="justify-content-center">
                <Image rounded src={logo} height="200px" width="auto" />
            </Row>
            <Row className="justify-content-center">
                <h1>Greetings Traveller!</h1>
            </Row>
            <Row className="justify-content-center">
                <h2>Be welcome at FileFighter</h2>
            </Row>
        </div>
    )
}

export function LoginInput(props: LoginInputInterface) {
    const {
        handleSubmit,
        username,
        setUsername,
        password,
        setPassword,
        isLoading,
        stayLoggedIn,
        setStayLoggedIn,
        errorMessage,
    } = props

    return (
        <div>
            <Row className="mt-4 justify-content-center">
                <Col className="login-input">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername" className="mb-3">
                            <Form.Control
                                autoFocus
                                placeholder="Username"
                                autoComplete="username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                autoComplete="current-password"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                            <Form.Text className="text-muted">
                                Contact your administrator if you have forgotten
                                your login details.
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className={isLoading ? "" : "d-none"}
                            />{" "}
                            <span className={isLoading ? "sr-only" : "d-none"}>
                                isLoading...
                            </span>
                            Sign in
                        </Button>
                        <Form.Group
                            controlId="formBasicCheckbox"
                            className="mt-3 justify-content-center"
                        >
                            <Form.Check
                                checked={stayLoggedIn}
                                type="checkbox"
                                label="Keep me signed in*"
                                onChange={() => setStayLoggedIn(!stayLoggedIn)}
                            />
                            <Form.Text className="text-muted">
                                *By clicking this, you accept the usage of
                                cookies.
                            </Form.Text>
                        </Form.Group>
                        <p className="text-danger">{errorMessage}</p>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login
