import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import './App.js';
import './App.css';
import {Link, Form, useSubmit} from "react-router-dom";


export function Login(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState(null);
    const [msg, setMsg] = useState("");
    const submit = useSubmit();


    useEffect(() => {
        if (state === null)
            setState(10);
        else if (state === 1) {
            let result = tryLogin();
            result.then((stat) => {
                if (stat === name) {
                    //continue
                    let formData = new FormData();
                    formData.append("username", name);
                    submit(formData, {method: "post", action: "/projectPage/"});
                } else {
                    setMsg(stat);
                    setState(10);
                }
            });
        }
    }, [state]);

    const handleChange = (event) => {
        const value = event.target.value;
        setName(value);
    };
    const handleChange2 = (event) => {
        const value = event.target.value;
        setPassword(value);
    };

    async function tryLogin() {
        let url = '/login/' + name + '/' + password;
        return fetch(url).then((response) => response.json())
            .then(async (userName) => {
                return userName.username;
            });
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <h3>{msg}</h3>
            <Form className="currentForm">
                <input type="text" name="username" variant="filled" placeholder="username" onChange={handleChange}/>
                <input name="password" variant="filled" type="password" placeholder="password"
                       onChange={handleChange2}/>
                <Button variant="contained" color="secondary" onClick={() => setState(1)}>Log In</Button>
            </Form>
            <h1>
                <Button variant="contained" color="secondary" component={Link} to="/register/">Register here!</Button>
            </h1>
        </div>
    );
}
