import React, {useEffect, useState} from "react";
import {Button, Form, FormControl, Tab, Tabs} from "react-bootstrap";
import axios from "axios";
import "./StartPage.css";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDomainUserThunk} from "../features/UsersSlice";

export function StartPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let user = useSelector((state) => state.user.domain);

    useEffect(() => {
        if (user != null) {
            navigate("/dashboard")
        }
    }, [navigate, user])

    const toggleTab = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (event) => {
        setUsernameError("")
        setPasswordError("")
        setEmailError("")

        event.preventDefault();

        if (!isLogin) {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);

            if (password === passwordCheck) {
                await axios.post("/open-api/users", {
                    email: email,
                    username: username,
                    password: password
                }).catch((error) => {

                    if(error.response.status === 409 && error.response.data.reason === "email"){
                        setEmailError(error.response.data.detail)
                    }else if (error.response.status === 409 && error.response.data.reason === "username")
                        setUsernameError(error.response.data.detail)
                    throw error;
                });
            } else {
                setPasswordError("Passwords do not match");
                throw Error()
            }
        }

        const config = {
            withCredentials: true,
        };

        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);

            await axios.post("/process_login", formData, config);
            dispatch(getDomainUserThunk())

        } catch (error) {
            setLoginError("Password and/or username are wrong")
        }
    };

    return (
        <div className="start-page">
            <h1>Smilodon</h1>
            <p>A free decentralized sport tracking activity, please login or register.</p>
            <div className="login-form">
                <Tabs activeKey={isLogin ? "login" : "register"} onSelect={toggleTab}>
                    <Tab eventKey="login" title="Login">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email" className={"fg-simodon"}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className={"fg-simodon"}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    isInvalid={loginError.length > 0}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <FormControl.Feedback type="invalid">{loginError}</FormControl.Feedback>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Login
                            </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="register" title="Register">
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group controlId="email" className={"fg-simodon"}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    isInvalid={emailError.length > 0}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                                <FormControl.Feedback type="invalid">{emailError}</FormControl.Feedback>
                            </Form.Group>
                            <Form.Group controlId="username" className={"fg-simodon"}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    isInvalid={usernameError.length > 0}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                />
                                <FormControl.Feedback type="invalid">{usernameError}</FormControl.Feedback>
                            </Form.Group>

                            <Form.Group controlId="password" className={"fg-simodon"}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="confirm-password" className={"fg-simodon"}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={passwordCheck}
                                    isInvalid={passwordError.length > 0}
                                    onChange={(event) => setPasswordCheck(event.target.value)}
                                    required
                                />
                                <FormControl.Feedback type="invalid">{passwordError}</FormControl.Feedback>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Register
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
