import React, {useEffect, useState} from "react";
import {Button, Form, Tab, Tabs} from "react-bootstrap";
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
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let user = useSelector((state) => state.user.domain);

    useEffect(() => {
        if(user != null){
            navigate("/dashboard")
        }
    },[navigate, user])

    const toggleTab = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();



        if (!isLogin) {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);

            if (password === passwordCheck) {
                await axios.post("/open-api/users", {email: email, username: username, password: password});
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
            console.error(error);
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
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Login
                            </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="register" title="Register">
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
                            <Form.Group controlId="username" className={"fg-simodon"}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                />
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
                                    onChange={(event) => setPasswordCheck(event.target.value)}
                                    required
                                />
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
